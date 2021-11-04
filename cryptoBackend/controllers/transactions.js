const loadPayment = require('./loadpayment');
const bcrypt = require('bcrypt');
const Account = require('../models/account');

const Stellar = require('./Stellar').Stellar;
const server = require('./Stellar').Server;
const passphrase = require('./Stellar').Passphrase
const eFCFA = require('./Stellar').eFCFA;

var io = require('../server');
const account = require('../models/account');

const encrypt = require('./crypt').encrypt
const decrypt = require('./crypt').decrypt

// Envoie
exports.Payment = async (req, res)=>{
    console.log(req.body.password);
    // var {number_phone, password, destinataire, value} = req.body
    var number_phone = req.body.number_phone
    var password = req.body.password
    var destinataire = req.body.destinataire
    var value = req.body.montant

    var pk, sk, to, value
    var passwordCorrect = true;
    var destinataireExist = true;
    await Account.findOne({ number_phone: number_phone })
    .then( async account => {
     await bcrypt.compare(password, account.password)
        .then(valid => {
          if (!valid) {
            passwordCorrect = false;
          }
          else{
              pk = account.public_key
              sk = decrypt(account.secret_key)
          }
        })
        .catch(error => res.status(500).json({ error: 'err1' }));
    })
    .then(()=>{
        return Account.findOne({ number_phone: destinataire })
    })
    .then(account => {
        if (!account) {
            destinataireExist = false;
        }else{
            to = account.public_key
        }
    })
    .catch(error => res.status(500).json({ error: 'err2', error }));

    if (!passwordCorrect) {
       return res.status(400).json({message : 'Le mot de pass est incorrect'})
    } else if(!destinataireExist) {
       return res.status(404).json({message : `Le destinataire ${destinataire} n'existe pas`})
    }else{
        server.loadAccount(to)
        .catch(()=>{
            res.status(404).json({message : `le destinataire n'existe ${destinataire} pas`})
        })
        .then(()=>{
            return server.loadAccount(pk)
        })
        .then(async (source) => {
            const transaction = await new Stellar.TransactionBuilder(source, {
                fee : Stellar.BASE_FEE,
                networkPassphrase : passphrase
            })
            .addOperation(Stellar.Operation.payment({
                destination : to,
                asset : eFCFA,
                amount : value.toString()
            }))
            .setTimeout(30)
            .build()
            
            const signer = Stellar.Keypair.fromSecret(sk)
            transaction.sign(signer)
            return await server.submitTransaction(transaction)
        })
        .then((result)=>{
            res.status(200).json({message : `transaction reussie`})
        })
        .catch((err)=>{
            res.status(500).json({message : err})
        })
    }
}

//suivi des reception
exports.historique = async (req, res) =>{
    var historique = []
    var accountId = null
    var hist  = null
   await Account.findOne({number_phone : req.params.number_phone})
    .then((account)=>{
       accountId = account.public_key
    })
    .then(()=>{
        // Create an API call to query payments involving the account.
        return payments = server.payments().forAccount(accountId);
    })
    .then(async(payments)=>{
            // If some payments have already been handled, start the results from the
        // last seen payment. (See below in `handlePayment` where it gets saved.)
        var lastToken = loadPayment.loadLastPagingToken();
        if (lastToken) {
            payments.cursor(lastToken);
        }
        // `stream` will send each recorded payment, one by one, then keep the
        // connection open and continue to send you new payments as they occur.
        // console.log(payments);
        
       await payments.stream({
           onmessage: async function (payment) {
                // Record the paging token so we can start from here next time.
                loadPayment.savePagingToken(payment.paging_token);

                // The payments stream includes both sent and received payments. We only
                // want to process received payments here.

                // In Stellar’s API, Lumens are referred to as the “native” type. Other
                // asset types have more detailed information.
                var asset;
                if (payment.asset_type === "native") {
                asset = "lumens";
                } else {
                    asset = payment.asset_code
                }
                if (payment.to !== accountId) {
                     var acc = payment.to
                     var mess = " envoyé à "  
                } else {
                    var acc = payment.source_account 
                    var mess = " reçu de "
                }
                
                await Account.findOne({public_key: acc})
                .then(async(account)=>{
                    if (account) {
                        hist = payment.amount + " " + "eFCFA" + mess +  account.number_phone
                    }
                    return hist
                })
                .then((hist)=>{
                    if(hist != null){
                        historique.push(hist)
                    }
                })
                if ((await payments.call()).records.length == 0) {
                    console.log(historique)
                    return res.end(JSON.stringify({historiques : historique}))
                }
            },
            onerror: function (error) {
                console.error("Error in payment stream");
            },
        });
        
    })
}