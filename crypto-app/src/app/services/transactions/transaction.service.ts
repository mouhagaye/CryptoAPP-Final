import { HttpClient } from '@angular/common/http';
import { global } from '@angular/compiler/src/util';
import { Injectable } from '@angular/core';
import { window } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  private endpoint = 'http://127.0.0.1:4000/transaction'
  private endpoint1 = 'http://127.0.0.1:4000/account'
  constructor(
    private http : HttpClient
  ) { }


  deposite(number_phone){
    return new Promise((resolve, reject)=>{
      this.http.post(`${this.endpoint1}/deposite`, {number_phone})
      .subscribe((res)=>{
        
        resolve(res)
      },
      (error)=>{
        reject(error)
      })
    })
  }
  withdraw(number_phone){
    return new Promise((resolve, reject)=>{
      this.http.post(`${this.endpoint1}/withdrawal`, {number_phone})
      .subscribe((res)=>{
        resolve(res)
      },
      (error)=>{
        reject(error)
      })
    })
  }

  trensfert(info){
    return new Promise((resolve, reject)=>{
      this.http.post(`${this.endpoint}/transfert`, info)
      .subscribe((res)=>{
        resolve(res)
      },
      (error)=>{
        reject(error)
      })
    })
  }

  getHistoriqueTransaction(){
    return new Promise((resolve, reject)=>{
      this.http.get(`${this.endpoint}/historique/${localStorage.getItem('number_phone')}`)
      .subscribe((historiqueTrx)=>{
        resolve(historiqueTrx)
      },
      (err)=>{
        reject(err)
      })
    })
  }


}