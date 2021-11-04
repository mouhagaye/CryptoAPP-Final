import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountsService } from 'src/app/services/accounts/accounts.service';


@Component({
  selector: 'app-generer-code',
  templateUrl: './generer-code.page.html',
  styleUrls: ['./generer-code.page.scss'],
})
export class GenererCodePage implements OnInit {

  number_phone : String
  msg : any
  codeAchat : any
  message : any
  messageError : any
  codeForm : FormGroup
  constructor(
    private fb : FormBuilder,
    private accountService : AccountsService
  ) { }

  genCodeForm(){
    this.codeForm = this.fb.group({
      password : ['', Validators.required]
    })
    this.number_phone = localStorage.getItem('number_phone');
  }
  ngOnInit(): void {
    this.genCodeForm()
    this.codeAchat = "000000";
    this.message = "Le code sera généré ci-dessous"
  }

  genererCodeAchat(){
    const account = {
      number_phone : localStorage.getItem('number_phone'),
      password : this.codeForm.value.password
    }
    this.accountService.genererCodeAchat(account)
    .then((code : any)=>{
      this.codeAchat = code.code_achat
      this.message = code.message
    })
    .catch((error)=>{
      console.log(error);
      this.messageError = error.error.message
    })

  }


}
