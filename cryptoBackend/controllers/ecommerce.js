const Ecommerce = require('../models/ecommerce');
const Account = require('../models/account');
const accountCtrl = require('./account')

const Stellar = require('./Stellar').Stellar;
const server = require('./Stellar').Server;
const passphrase = require('./Stellar').Passphrase;
const { eFCFA } = require('./Stellar');
const encrypt = require('./crypt').encrypt
const decrypt = require('./crypt').decrypt

exports.payment = async (req, res)=>{
    // Recuperation des information d'achat 
    var achat = {
        code_achat : req.body.code_achat,
        public_key_marchand : req.body.numero_marchand,
        price : req.body.price   
    }

    // On cherche le code code d'achat dans la base de donnée
    await Ecommerce.findOne({ code_achat : achat.code_achat })
    .then((code)=>{
        if (!code) {
            // Renvoyer une erreur si le code n'existe pas
            res.status(404).json({code_achat : false, payment : 'Failed', solde : '' })
        } 
        return code.createdBy; // Retourner l'id du compte qui à généré le code d'achat
        
    }).then((idAccount)=>{ 
        Account.find({_id : idAccount})
        .then((account)=>{
            try {
               const balance = accountCtrl.getBalance(account.number_phone); // Recuperation du solde du client (acheteur)
               if (balance >= achat.price ) { // Verifier si le solde du client est suffisant pour effectuer cet achat
                    const account = server.loadAccount(account.public_key)
                    const transaction = new Stellar.TransactionBuilder(account, {
                        fee : Stellar.BASE_FEE,
                        networkPassphrase : passphrase
                    })
                    .addOperation(Stellar.Operation.payment({
                        destination : achat.public_key_marchand,
                        asset : Stellar.Asset.native(),
                        amount : achat.price
                    }))
                    .setTimeout(30)
                    .build()
        
                    const signer = Stellar.Keypair.fromSecret(decrypt(account.secret_key))
                    transaction.sign(signer)
        
                    server.submitTransaction(transaction)
                    .then(()=>{
                        // Supprimer le code après l'achat
                    })

                    res.status(200).json({code_achat : true, payment : 'Success', solde : ''})

                } else { // Si le solde n'est pas suffisant
                    res.status(200).json({code_achat : true, payment : 'Failed', solde : 'insuffisant'})
               }
            } catch (error) {
                res.status(500).json({payment : 'Failed', Message : 'Erreur de serveur'})
            }
        })
    })
}

exports.paymentMarchand = async (req, res)=>{
    var achat = {
        code_marchand : req.body.code_marchand,
        number_phone : req.body.number_phone,
        price : req.body.price   
    }
    console.log(achat);
    await Account.findOne({code_marchand : achat.code_marchand})
    .then((account)=>{
        if (!account) {
            return res.status(401).json({message : `Ce code marchand n'existe pas`})
        }
        return account.public_key
    })
    .then(async(public_key_marchand)=>{
       await Account.findOne({number_phone : achat.number_phone})
        .then(async (account)=>{
            const source = await server.loadAccount(account.public_key)
                    const transaction = new Stellar.TransactionBuilder(source, {
                        fee : Stellar.BASE_FEE,
                        networkPassphrase : passphrase
                    })
                    .addOperation(Stellar.Operation.payment({
                        destination : public_key_marchand,
                        asset : eFCFA,
                        amount : (achat.price).toString()
                    }))
                    .setTimeout(30)
                    .build()
        
                    const signer = Stellar.Keypair.fromSecret(sk = decrypt(account.secret_key))
                    transaction.sign(signer)
                   await server.submitTransaction(transaction)
        })
        .then(()=>{
            return res.status(200).json({message : 'Paiement effectué'})
        })
        .catch(error=> console.log(error))
    })
}

exports.code_marchandss = async (req, res)=>{
    var number_phone = req.params.number_phone;

    await Account.findOne({number_phone : number_phone})
    .then((account)=>{
        if (!account) {
           return res.status(400).json({message : "Ce compte n'existe pas"})
        } else if(account.code_marchand !== null) {
           return res.status(201).json({message : `Ce compte à deja un code marchand : ${account.code_marchand}`})
        }
        const code_marchand = Math.floor(10000 + Math.random() * 90000)
        Account.updateOne(account, {code_marchand : code_marchand})
        .then(()=>{
            return res.status(200).json({message : `Code marchand créé : ${code_marchand}`})
        })
        .catch((error)=>{
            return res.status(500).json({message : 'Une erreur est suvenue :', error})
        })
    })
}