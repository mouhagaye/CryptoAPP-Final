import { Injectable } from '@angular/core';
import  * as Stellar from 'stellar-sdk';
import axios from 'axios';
import {loEach} from 'lodash'
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AnchorsService {
private toml ;
private endpoint1 = 'http://127.0.0.1:4000/account'
  constructor(
    private http : HttpClient,
    private router: Router
  ) {}
 
  async getToml(urlAnchor): Promise<any> {
    return await Stellar.StellarTomlResolver.resolve(urlAnchor)
  }
 async depo(anchor){
   
  new Promise((resolve, reject)=>{
    var number_phone = localStorage.getItem('number_phone')
    this.http.post(`${this.endpoint1}/deposite`, {number_phone, anchor})
    .subscribe((res)=>{
      resolve(res)
    },
    (error)=>{
      reject(error)
    })
  })
  .then((interact:any)=>{
    interact = interact.interact
    const urlBuilder = new URL(interact.url)
    urlBuilder.searchParams.set('callback', 'postMessage')
    const popup = open(urlBuilder.toString(), 'popup', 'width=500,height=800')
    
    if (!popup) {
         // this.loading = { ...this.loading, deposit: false }
         throw 'Popups are blocked. You\'ll need to enable popups for this demo to work'
    }
     
    window.onmessage  = ({ data: { transaction } }) => {
        if (transaction.status === 'completed') {
          this.router.navigateByUrl('/tabs/tab1', { skipLocationChange: true }).then(() => {
            this.router.navigate(['/tabs/tab1']);
        });
        } else {
          setTimeout(() => {
            const urlBuilder = new URL(transaction.more_info_url)
            urlBuilder.searchParams.set('callback', 'postMessage')
            popup.location.href = urlBuilder.toString()
          }, 1000)
        }
      }
 })
}

  async withdrawal(anchor){
    var server = new Stellar.Server('http://127.0.0.1:8000/', {allowHttp: true});
    var eFCFA = new Stellar.Asset('eFCFA', 'GA2G4RFZH6PJQ2MNY5UBPPW7KERGVQE3ATZ5DBMY5IBR4LJZH346BGAT');
    var Passphrase = "Standalone Network ; February 2017";
    var interact;
    var token;
    new Promise((resolve, reject)=>{
      var number_phone = localStorage.getItem('number_phone')
      this.http.post(`${this.endpoint1}/withdrawal`, {number_phone, anchor})
      .subscribe((res)=>{
        resolve(res)
      },
      (error)=>{
        reject(error)
      })
    })
    .then(async(res:any)=>{
      interact = res.interact
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
              .accountId(res.pk)
              .call()
              .then(async({ sequence }) => {
                const account = new Stellar.Account(res.pk, sequence)
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
                const signer = Stellar.Keypair.fromSecret(res.sk)
                txn.sign(signer)
                console.log(txn);
                return await server.submitTransaction(txn)
              })
              .then((res) => {
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
    })
    .then(()=>{
      console.log("ok");
    })
  }
}
