const Account = require('../models/account');
const Ecommerce = require('../models/ecommerce')
const bcrypt = require('bcrypt');

const Stellar = require('./Stellar').Stellar;
const server = require('./Stellar').Server;
const passphrase = require('./Stellar').Passphrase;
const eFCFA = require('./Stellar').eFCFA;

const trust = require('./trust').trust
const MasterKey = Stellar.Keypair.master(passphrase)
const MasterSecret = MasterKey.secret();
const MasterPublicKey = MasterKey.publicKey();
const axios = require('axios')
const jwt = require('jsonwebtoken');

const encrypt = require('./crypt').encrypt
const decrypt = require('./crypt').decrypt


// Creating new account 
exports.creatingAccount = async (req,res) => {
    // Recuperation des informaion envoyées par l'utilisateur 
    var accountToCreate = {
        number_phone : req.body.number_phone,
        password : req.body.password,
        nom : req.body.nom,
        prenom : req.body.prenom,
    }
    // Cette variable nous permettra de verifier si le numéro est dejà utilisé ou pas
    var numberNotUsed = true;

    // On cherche le numero dans la base de donnée
    await Account.findOne({number_phone : accountToCreate.number_phone})
    .then(result=>{
        if (result) {
            numberNotUsed = false;
        }
    })

    if (!numberNotUsed){ // Si le numero est déja utilisé on retourne une erreur et le programme s'arrete 
        res.status(400).json({message : "Un compte est déjà ouvert avec ce numéro"})
    } else if(accountToCreate.number_phone == "" || accountToCreate.password==""){
        res.status(400).json({message : "remplire tous les champs"})
    }
    else { // Sinon on le créé

        // Generer une paire de clé pour le compte
        const newAccount = Stellar.Keypair.random(passphrase);
        var newAccountSk = newAccount.secret();
        var newAccountPk = newAccount.publicKey();
        console.log(MasterPublicKey);
        server.loadAccount(MasterPublicKey)
        .then((account)=>{
            const fee = Stellar.BASE_FEE;
            
            const transaction = new Stellar.TransactionBuilder(account,
                { 
                    fee,
                    networkPassphrase: passphrase
                })
                .addOperation(Stellar.Operation.createAccount({
                source: MasterPublicKey,
                destination: newAccountPk,
                startingBalance: "1000"                                      
                }))
                .setTimeout(30)
                .build();
                
            transaction.sign(MasterKey);
            return server.submitTransaction(transaction);
        })
        // await axios.default.get(
        //     `https://friendbot.stellar.org?addr=${newAccountPk}`
        //   )
        .then(()=>{
            console.log('new', newAccountPk);
           return trust(newAccountSk);
        })
        .then((result)=>{
            bcrypt.hash(accountToCreate.password, 10) //Hashage du mot de pass avant de le stocké dans la base de donnée
            .then(hash => {
            const account = new Account({
                number_phone : accountToCreate.number_phone,
                password : hash,
                prenom : accountToCreate.prenom,
                nom : accountToCreate.nom,
                public_key : newAccountPk,
                secret_key : encrypt(newAccountSk),
                code_marchand : Math.floor(10000 + Math.random() * 90000)
            });
            account.save()
                .then(() => {
                    // 
                    res.status(201).json({'msg' : 'Compte créé' });
                })
                .catch(error => {
                console.log(error);
                res.status(400).json({ error }) 
            });
            })
            .catch(error => res.status(500).json({ error }));
        })
        .catch(err=>console.log(err))
    }        
}


exports.login = (req, res)=>{
    let getAccount;
    Account.findOne({
        number_phone: req.body.number_phone
    }).then(account => {
        if (!account) {
            return res.status(401).json({
                message: "Ce compte n'existe pas"
            });
        }
        getAccount = account;
        return bcrypt.compare(req.body.password, account.password);
    }).then(response => {
        if (!response) {
            return res.status(401).json({
                message: "Mot de passe incorrect"
            });
        }
        let jwtToken = jwt.sign({
            number_phone: getAccount.number_phone,
            accountId: getAccount._id
        }, "longer-secret-is-better", {
            expiresIn: "1h"
        });
        res.status(200).json({
            token: jwtToken,
            expiresIn: 3600,
            number_phone : getAccount.number_phone,
            prenom : getAccount.prenom,
            nom : getAccount.nom,
            _id: getAccount._id
        });
    }).catch(err => {
        return res.status(401).json({
            message: "Erreur de serveur, reessayer plus tard !"
        });
    });
}


// get le solde du compte
exports.balance = async (req, res)=>{
   try{
        const number_phone = req.params.number_phone;
        var balance = await this.getBalance(number_phone)
        res.status(200).json({'balance' : `${balance}`})
    }catch(err){
        res.status(500).json({'message' : err})
    }

}

exports.getBalance = async (number_phone) =>{
    var pk;
    await Account.findOne({number_phone : number_phone})
    .then((account)=>{
        pk = account.public_key
    })
    const account = await server.loadAccount(pk);
    var balance = 0;
    account.balances.forEach((bal)=>{
        if (bal.asset_code=='eFCFA') {
            balance = balance + bal.balance;
        }
    })
    return balance
}

exports.getCodeAchat = async (req, res) =>{
    var number_phone = req.body.number_phone
    var password = req.body.password
    await Account.findOne({ number_phone: number_phone })
    .then(account => { // Veirfier si les informations sont correctes*
      bcrypt.compare(password, account.password)
        .then(valid => {
            if (!valid) {
                res.status(500).json({ message: 'Mot de passe incorrect'})
                return
            }
            // Creation d'un objet avec le code généré et l'id du compte générateur du code
            const code_genere = new Ecommerce({
                code_achat :  Math.floor(100000 + Math.random() * 900000), // générer un code de 6 chiffres
                createdBy : account._id
            })
            code_genere.save()
            .then(() => { // Une fois le code généré on lance le compte à rebours
                setTimeout( // Le code généré va être supprimé dans 120000 secondes (2 minutes)
                    ()=>{
                        this.delete(code_genere._id)
                    },
                    30000
                    )
                res.status(200).json({message : "Ce code expire dans 2 minutes", code_achat : code_genere.code_achat})
            })
            .catch(error => res.status(400).json({ error }));
        })
        .catch(error => res.status(500).json({ message: error }));
    })
    .catch(error => res.status(500).json({ message: error }));
}


exports.delete = (number_phone)=>{
    Ecommerce.deleteOne({_id: number_phone})
    .then(()=>{console.log('code supprimé');
    }).catch(err=>{console.log(err);})
}

exports.getFature = (req, res)=>{
    var numero_facture = req.params.numero_facture

    var facture = {
        numero_facture : numero_facture,
        montant_a_payer : 87850,
        date_limite_paiement : '12-05-2021',
        paye : true
    }

    res.status(200).json({message : facture})
}