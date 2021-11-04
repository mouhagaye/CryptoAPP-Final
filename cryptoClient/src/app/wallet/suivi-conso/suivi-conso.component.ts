import { Component, OnInit } from '@angular/core';
import { AccountsService } from 'src/app/services/accounts/accounts.service';
import { AnchorsService } from 'src/app/services/anchors.service';
import { TransactionService } from 'src/app/services/transactions/transaction.service';

@Component({
  selector: 'app-suivi-conso',
  templateUrl: './suivi-conso.component.html',
  styleUrls: ['./suivi-conso.component.scss']
})
export class SuiviConsoComponent implements OnInit {
  codeAchat : any
  hist : any
  solde : any
  constructor(
    private accountService : AccountsService,
    private transactionService : TransactionService,
    private anchorServices : AnchorsService
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
    
  }
  deposite(){
    this.anchorServices.depo()
    // this.transactionService.deposite(localStorage.getItem('number_phone'))
    // .then((res)=>{
    //   console.log(res);
      
    // })
    // .catch((error)=>{
    //   console.log(error);
      
    // })
  }
  
  withdraw(){
    this.anchorServices.withdrawal()
    // this.transactionService.withdraw(localStorage.getItem('number_phone'))
    // .then((res)=>{
    //   console.log(res);
      
    // })
    // .catch((error)=>{
    //   console.log(error);
      
    // })
  }

}
