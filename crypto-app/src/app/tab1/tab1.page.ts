import { Component } from '@angular/core';
import { AccountsService } from 'src/app/services/accounts/accounts.service';
import { TransactionService } from 'src/app/services/transactions/transaction.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  number_phone : String
  codeAchat : any
  hist : any
  solde : any
  prenom : String;
  nom : String;
  noms : String

  constructor(
    private accountService : AccountsService,
    private transactionService : TransactionService,
  ) { 
    this.accountService.getSolde(localStorage.getItem('number_phone'))
    .then((solde : any)=>{
      this.solde = solde.balance
    })
    this.transactionService.getHistoriqueTransaction()
    .then((hist : any)=>{
      this.hist = hist.historiques.reverse()
    })
  }

  ngOnInit(): void {
    this.number_phone = localStorage.getItem('number_phone');
    this.prenom = localStorage.getItem('prenom');
    this.nom = localStorage.getItem('nom');
    this.accountService.getSolde(localStorage.getItem('number_phone'))
    .then((solde : any)=>{
      this.solde = solde.balance
    })
    this.noms = this.prenom +" "+this.nom;
    console.log(localStorage);

  }

  logout() {
    this.accountService.doLogout()
  }
  ionViewDidEnter() {
    this.accountService.getSolde(localStorage.getItem('number_phone'))
    .then((solde : any)=>{
      // this.solde = solde.balance.replace(/(\.[0-9]*?)0+/g, "");
      this.solde = solde.balance
    })
    this.number_phone = localStorage.getItem('number_phone');

  }
  ionViewWillEnter(){
    this.accountService.getSolde(localStorage.getItem('number_phone'))
    .then((solde : any)=>{
      this.solde = solde.balance
    })
    this.transactionService.getHistoriqueTransaction()
    .then((hist : any)=>{
      this.hist = hist.historiques.reverse()
    })
    this.number_phone = localStorage.getItem('number_phone');

  }
  // ionViewDidLoad() {
  // this.accountService.getSolde(localStorage.getItem('number_phone'))
  //   .then((solde : any)=>{
  //     this.solde = solde.balance
  //   })
  // }
  // ionViewWillLeave() {
  //   this.accountService.getSolde(localStorage.getItem('number_phone'))
  //   .then((solde : any)=>{
  //     this.solde = solde.balance
  //   })
  // }
  // ionViewDidLeave() {
  //   this.accountService.getSolde(localStorage.getItem('number_phone'))
  //   .then((solde : any)=>{
  //     this.solde = solde.balance
  //   })
  // }
  // ionViewWillUnload() {
  //   this.accountService.getSolde(localStorage.getItem('number_phone'))
  //   .then((solde : any)=>{
  //     this.solde = solde.balance
  //   })
  // }
  doRefresh(event) {
    this.accountService.getSolde(localStorage.getItem('number_phone'))
    .then((solde : any)=>{
      this.solde = solde.balance
    })
    this.transactionService.getHistoriqueTransaction()
    .then((hist : any)=>{
      this.hist = hist.historiques.reverse()
    })

    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }

  



}
