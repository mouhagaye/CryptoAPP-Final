import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountsService } from 'src/app/services/accounts/accounts.service';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  progressBar : boolean = false;
  alertError : boolean = false;
  messageAlert : String
  registerForm: FormGroup;
  

  constructor(
    public fb: FormBuilder,
    public accountService: AccountsService,
    public router: Router
  ) {
    this.registerForm = this.fb.group({
      number_phone: ['', Validators.required],
      nom : ['', Validators.required],
      prenom: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]}, 
      {validator: SignupPage.passwordsMatch});
  }

  static passwordsMatch(cg: FormGroup): {[err: string]: any} {
    let pwd1 = cg.get('password');
    let pwd2 = cg.get('confirmPassword');
    let rv: {[error: string]: any} = {};
    if ((pwd1.touched || pwd2.touched) && pwd1.value !== pwd2.value) {
      rv['passwordMismatch'] = true;
    }
    return rv;
  }

  ngOnInit() { }

  registerAccount() {
    this.progressBar = true
    this.accountService.signUp(this.registerForm.value)
    .then((res: any) => {
        this.registerForm.reset()
        this.progressBar = false;
        this.router.navigate(['login']);
    })
    .catch((err)=>{

      this.alertError = true;
      this.progressBar = false;
      this.messageAlert = err.error.message
      console.log(err.error.text);
      
    })
  }

}
