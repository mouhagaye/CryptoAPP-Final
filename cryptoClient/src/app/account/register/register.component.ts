import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountsService } from 'src/app/services/accounts/accounts.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
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
      password: ['', Validators.required],
      nom : ['', Validators.required],
      prenom: ['', Validators.required],

    })
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
