import { Injectable } from '@angular/core';
import  * as Stellar from 'stellar-sdk';
import axios from 'axios';
import {loEach} from 'lodash'
@Injectable({
  providedIn: 'root'
})
export class AnchorsService {
  private toml:any; 
  private urlAnchor = '127.0.0.1:9000';
  constructor() {
    this.getToml()
    .then((toml)=>{
      this.toml = toml
    })
  }

/* add "browser": {
    "http": false,
    "https": false,
    "fs": false,
    "os": false,
    "path": false
  },
  to package.json

  "allowedCommonJsDependencies": [
              "buffer",
              "stellar-sdk"
           ],
           to angular.json - options
  (window as any).global = window; to polyfills.ts
*/
        
  async getToml(): Promise<any> {
    return await Stellar.StellarTomlResolver.resolve(this.urlAnchor)
  }
 async depo(){
  const pk = "GCXUZG4276JSPCRGIAIDW6XEBOLQV6I4UAJFDJ37R3FPUALXLICG6XVO"
  const sk = "SDK5TRJGPZ6Q7D46QXJNYOO6Q5NI3O3WDJTTIUV7DIM4NIVG5RT3WYTI"
  var interact
  var token
  await axios.get(`${this.toml.TRANSFER_SERVER_SEP0024}/info`)
  .then(async(info)=>{
    return await axios.get(`${this.toml.WEB_AUTH_ENDPOINT}`, {
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
               `${this.toml.WEB_AUTH_ENDPOINT}`,
               { transaction },
               { headers: { 'Content-Type': 'application/json' } }
             )}
           )
           .then(({ data: { token } }) => token) // TODO: Store the JWT in localStorage  
                
 }).then(async(auth)=>{
     interact =  await axios.post(
         `${this.toml.TRANSFER_SERVER_SEP0024}/transactions/deposit/interactive`,
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
     return axios.get(`${this.toml.TRANSFER_SERVER_SEP0024}/transactions`, {
       params: {
         asset_code: 'eFCFA',
         limit: 1,
         kind: 'deposit',
       },
       headers: {
         Authorization: `Bearer ${token}`,
       },
     })
     .then(({ data: { transactions } }) => console.log('transac', transactions))
     .catch(err=>console.log(err))
 }).then(()=>{
     const urlBuilder = new URL(interact.url)
     urlBuilder.searchParams.set('callback', 'postMessage')
     const popup = open(urlBuilder.toString(), 'popup', 'width=500,height=800')

     if (!popup) {
         // this.loading = { ...this.loading, deposit: false }
         throw 'Popups are blocked. You\'ll need to enable popups for this demo to work'
     }
     
     window.onmessage  = ({ data: { transaction } }) => {
       console.log('globalllllllllllllllllllllllllll');
         console.log(transaction.status, transaction)
         if (transaction.status === 'completed') {
          //  this.updateAccount()
          //  this.loading = { ...this.loading, deposit: false }
         } else {
           setTimeout(() => {
             const urlBuilder = new URL(transaction.more_info_url)
             urlBuilder.searchParams.set('callback', 'postMessage')
             popup.location.href = urlBuilder.toString()
           }, 1000)
         }
       }
 })
 .then(()=>{
   console.log("ok");
    //  return res.status(200).json({message: 'Transaction terminée !'})
 })
    
  }

  async withdrawal(){
    var server = new Stellar.Server('http://127.0.0.1:8000/', {allowHttp: true});
    var eFCFA = new Stellar.Asset('eFCFA', 'GA2G4RFZH6PJQ2MNY5UBPPW7KERGVQE3ATZ5DBMY5IBR4LJZH346BGAT');
    var Passphrase = "Standalone Network ; February 2017";
    var pk = "GCXUZG4276JSPCRGIAIDW6XEBOLQV6I4UAJFDJ37R3FPUALXLICG6XVO";
    var sk = "SDK5TRJGPZ6Q7D46QXJNYOO6Q5NI3O3WDJTTIUV7DIM4NIVG5RT3WYTI";
    var interact;
    var token;
    return await axios.get(`${this.toml.TRANSFER_SERVER_SEP0024}/info`)
    .then(async(info)=>{
           return await axios.get(`${this.toml.WEB_AUTH_ENDPOINT}`, {
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
                      `${this.toml.WEB_AUTH_ENDPOINT}`,
                      { transaction },
                      { headers: { 'Content-Type': 'application/json' } }
                    )}
                  )
                  .then(({ data: { token } }) => token) // TODO: Store the JWT in localStorage       
        }).then(async(auth)=>{
            interact =  await axios.post(
                `${this.toml.TRANSFER_SERVER_SEP0024}/transactions/withdraw/interactive`,
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
            return axios.get(`${this.toml.TRANSFER_SERVER_SEP0024}/transactions`, {
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
            
            const urlBuilder = new URL(interact.url)
            urlBuilder.searchParams.set('callback', 'postMessage')
            const popup = open(urlBuilder.toString(), 'popup', 'width=500,height=800')

            if (!popup) {
                throw 'Popups are blocked. You\'ll need to enable popups for this demo to work'
            }
            await new Promise((resolve, reject) => {
                var submittedTxn
                console.log(interact);

                window.onmessage = ({ data: { transaction } }) => {
                  console.log(transaction.status, transaction)
                  if (transaction.status === 'completed') {
                    // this.updateAccount()
                    // this.loading = { ...this.loading, withdraw: false }
                    resolve(null)
                  } else if (
                    !submittedTxn &&
                    transaction.status === 'pending_user_transfer_start'
                  ) {
                    server
                      .accounts()
                      .accountId(pk)
                      .call()
                      .then(async({ sequence }) => {
                        const account = new Stellar.Account(pk, sequence)
                        const txn = new Stellar.TransactionBuilder(account, {
                          fee: Stellar.BASE_FEE,
                          networkPassphrase: Passphrase,
                        })
                          .addOperation(
                            Stellar.Operation.payment({
                              destination:  transaction.withdraw_anchor_account,
                              asset: eFCFA,
                              amount: transaction.amount_in,
                            })
                          )
                          .addMemo(Stellar.Memo.text("Withdrawal"))
                          .setTimeout(30)
                          .build()
                        const signer = Stellar.Keypair.fromSecret(sk)
                        txn.sign(signer)
                        console.log(txn);
                        
                        // console.log(server.submitTransaction(txn));
                       
                        return await server.submitTransaction(txn)
                      
                      })
                      .then((res) => {
                        
                        console.log("attente------------------------------")
                        submittedTxn = res
                        
                        const urlBuilder = new URL(transaction.more_info_url)
                        urlBuilder.searchParams.set('callback', 'postMessage')
          
                        popup.location.href = urlBuilder.toString()
                      })
                      .catch((err) => console.log(err))
                  } else {
                    setTimeout(() => {
                      const urlBuilder = new URL(transaction.more_info_url)
                      urlBuilder.searchParams.set('callback', 'postMessage')
          
                      popup.location.href = urlBuilder.toString()
                    }, 1000)
                  }
                }
              })
              console.log("ok");
              
        })
        .then(()=>{
            console.log("ok");
            
        })
  }
}