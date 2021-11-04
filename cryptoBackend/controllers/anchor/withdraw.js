const Stellar = require('../Stellar').Stellar
const server = require('../Stellar').Server
const axios = require('axios').default
const passphrase = require('../Stellar').Passphrase
const urlAnchor = require('../Stellar').urlAnchor
const loEach = require('lodash').each
var FormData = require('form-data');
const eFCFA = require('../Stellar').eFCFA
// var FormData = require('formdata');
const Account = require('../../models/account')
const open = require('open')
const encrypt = require('../crypt').encrypt
const decrypt = require('../crypt').decrypt
var toml
var token
var interact


exports.getToml = async (anchor) => {
  var urlAnchor = '127.0.0.1'
  switch (anchor) {
    case 'om':
      urlAnchor = urlAnchor + ':9000'
      break;
    case 'free':
      urlAnchor = urlAnchor + ':9001'
      break;
    case 'wave':
      urlAnchor = urlAnchor + ':9002'
      break;
   
  }
  return await Stellar.StellarTomlResolver.resolve(urlAnchor)
}

exports.withdraw = async (req, res) => {
    number_phone = req.body.number_phone
    anchor = req.body.anchor
    var pk
    var sk
    
    this.getToml(anchor)
    .then((toml1)=>{
    toml = toml1
    }).then(async()=>{
      return Account.findOne({ number_phone: number_phone })
    })
    .then( async account => {
      pk = account.public_key
      sk = decrypt(account.secret_key)
    })
    .then(async()=>{
      return await axios.get(`${toml.TRANSFER_SERVER_SEP0024}/info`)
    })
    .then(async(info)=>{
           return await axios.get(`${toml.WEB_AUTH_ENDPOINT}`, {
                    params: {
                    account: pk,
                    },
                })
                .then(async ( {data} ) => {
                    const transaction = new Stellar.Transaction(
                      data.transaction,
                      data.network_passphrase
                    )
                    const signer = Stellar.Keypair.fromSecret(sk)
                    transaction.sign(signer)
                    return transaction.toEnvelope().toXDR("base64");
                  })
                  .then((transaction) =>{
                   return axios.post(
                      `${toml.WEB_AUTH_ENDPOINT}`,
                      { transaction },
                      { headers: { 'Content-Type': 'application/json' } }
                    )}
                  )
                  .then(({ data: { token } }) => token) // TODO: Store the JWT in localStorage       
        }).then(async(auth)=>{
            var formData = new FormData()
            
            loEach(
            {
                asset_code: 'eFCFA',
                account: pk,
                lang: 'en',
            },
            (value, key) => formData.append(key, value)
            )
            
            interact =  await axios.post(
                `${toml.TRANSFER_SERVER_SEP0024}/transactions/withdraw/interactive`,
                {
                    asset_code: 'eFCFA',
                    account: pk,
                    lang: 'en',
                },
                {
                    headers: {
                        Authorization: `Bearer ${auth}`,
                        'Content-Type': 'application/json',
                    },
                }
            )
            .then(({ data }) => data)
            .catch((error)=>{
                console.log(error);
            })
            token = auth
            
        }).then(async()=>{
            return axios.get(`${toml.TRANSFER_SERVER_SEP0024}/transactions`, {
              params: {
                asset_code: 'eFCFA',
                limit: 1,
                kind: 'withdrawal',
              },
              headers: {
                Authorization: `Bearer ${token}`,
              },
            })
            .then(({ data: { transactions } }) => transactions)
            .catch(err=>console.log(err))
        }).then(async()=>{
          res.status(200).json({interact: interact, pk: pk, sk:sk})
        })
}

