import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AccountsService {
  endpoint = 'http://127.0.0.1:4000/account'
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  currentUser = {}
  constructor(
    private http :  HttpClient,
    private router : Router
    ) { }


  login(account){
    return new Promise((resolve, reject)=>{
      this.http.post<any>(`${this.endpoint}/login`, account)
      .subscribe((account : any)=>{
        localStorage.setItem('access_token', account.token)
        localStorage.setItem('accountId', account._id)
        localStorage.setItem('number_phone', account.number_phone)
        this.getSolde(account.number_phone)
        .then((solde : any)=>{
          resolve(solde)
          this.router.navigate(['account/wallet']);
        })
        .catch(err=>reject(err))
      },
      (error)=>{
        reject(error)
      })
    })
  }

  signUp(account){
    return new Promise((resolve, reject)=>{
      this.http.post<any>(`${this.endpoint}/createAccount`, account)
      .subscribe((account)=>{
        
        resolve(account)
      },
      (error)=>{
        reject(error)
      })
    })
  }

  getSolde(number_phone){
    return new Promise((resolve, reject)=>{
      this.http.get(`${this.endpoint}/balance/${number_phone}`)
      .subscribe((res)=>{
        resolve(res)
      },
      (err)=>{
        reject(err)
      })
    })
  }

  genererCodeAchat(forAccount){
    return new Promise((resolve, reject)=>{
      this.http.post(`${this.endpoint}/getCodeAchat`, forAccount)
      .subscribe((codeAchat)=>{
        resolve(codeAchat)
      },
      (error)=>{
        
        reject(error)
      })
    })
  }

  getToken() {
    return localStorage.getItem('access_token');
  }

  get isLoggedIn(): boolean {
    let authToken = localStorage.getItem('access_token');
    return (authToken !== null) ? true : false;
  }

  doLogout() {
    let removeToken = localStorage.removeItem('access_token');
    localStorage.removeItem('accountId');
    localStorage.removeItem('number_phone')
    if (removeToken == null) {
      this.router.navigate(['login']);
    }
  }

  // User profile
  getUserProfile(id): Observable<any> {
    let api = `${this.endpoint}/account/${id}`;
    return this.http.get(api, { headers: this.headers }).pipe(
      map((res: Response) => {
        return res || {}
      }),
      catchError(this.handleError)
    )
  }


  getFacture(facture){
    var numero_facture = facture.numero_facture
    return new Promise((resolve, reject)=>{
      this.http.get(`${this.endpoint}/getFacture/${numero_facture}`)
      .subscribe((result)=>{
        resolve(result);
      },
      (error)=>{
        reject(error);
      })
    })
  }

  // Error 
  handleError(error: HttpErrorResponse) {
    let msg = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      msg = error.error.message;
    } else {
      // server-side error
      msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(msg);
  }
}

