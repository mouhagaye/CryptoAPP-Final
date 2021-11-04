import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EcommerceService {
 private endpoint = 'http://127.0.0.1:4000/api/'
  constructor(
    private http : HttpClient
  ) { }

  codeMarchand(){
    const number_phone = localStorage.getItem('number_phone')
    return new Promise((resolve, reject)=>{
      this.http.get(`${this.endpoint}codeMarchand/${number_phone}`)
      .subscribe((result)=>{
        resolve(result)
      },
      (error)=>{
        reject(error)
      })
    })
  }

  paymantMarchand(info){
    console.log(info);
    
    return new Promise((resolve, reject)=>{
      this.http.post(`${this.endpoint}paymentMarchand`, info)
      .subscribe((result)=>{
        resolve(result)
      },
      (error)=>{
        reject(error)
      })
    })
  }
}
