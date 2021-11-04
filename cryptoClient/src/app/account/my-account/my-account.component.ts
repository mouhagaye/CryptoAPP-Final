import { Component, OnInit } from '@angular/core';
import { AccountsService } from 'src/app/services/accounts/accounts.service';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.scss']
})
export class MyAccountComponent implements OnInit {
  codeAchat : any
  message : any
  solde : any
  constructor(
    private accountService : AccountsService
  ) { }

  ngOnInit(): void {
    this.accountService.getSolde(localStorage.getItem('number_phone'))
    .then((solde : any)=>{
      this.solde = solde.balance
    })
  }

  genererCodeAchat(){
    const account = {
      number_phone : localStorage.getItem('number_phone'),
      password : 'tests' //Remplacer 'test' par le mot de passe de l'utilisateur
    }
    this.accountService.genererCodeAchat(account)
    .then((code : any)=>{
      this.codeAchat = code.code_achat
      this.message = code.message
    })
    .catch((error)=>{
      this.message = error.error.message
    })

  }

}
