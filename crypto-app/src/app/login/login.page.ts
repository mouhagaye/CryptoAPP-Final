import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule  } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountsService } from 'src/app/services/accounts/accounts.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  progressBar : boolean = false;
  alertError : boolean = false;
  messageAlert : String
  accountForm : FormGroup;
  constructor(
    private fb : FormBuilder,
    private accoutsService : AccountsService,
    private router : Router
  ) { }

  loginForm(){
    this.accountForm = this.fb.group({
      number_phone : ['', Validators.required],
      password : ['', Validators.required]
    })
  }

  ngOnInit(): void {
    if (this.accoutsService.isLoggedIn) {
      this.router.navigate(['tabs/tab1'])
    } else {
      this.loginForm()
    }
  }

  loginAccount(){
    this.progressBar = true
    this.accountForm.enabled
    this.accoutsService.login(this.accountForm.value)
    .then((solde : any)=>{
      this.progressBar = false;
   })
    .catch((err)=>{
      this.alertError = true;
      this.progressBar = false;
      this.messageAlert = err.error.message
    })
  }

}
