import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountsService } from 'src/app/services/accounts/accounts.service';

@Component({
  selector: 'app-code-achat',
  templateUrl: './code-achat.component.html',
  styleUrls: ['./code-achat.component.scss']
})
export class CodeAchatComponent implements OnInit {
  number_phone : String
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
