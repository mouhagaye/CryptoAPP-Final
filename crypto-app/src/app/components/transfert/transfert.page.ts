import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TransactionService } from 'src/app/services/transactions/transaction.service';

@Component({
  selector: 'app-transfert',
  templateUrl: './transfert.page.html',
  styleUrls: ['./transfert.page.scss'],
})
export class TransfertPage implements OnInit {

  message : any
  progress : any
  transfertForm : FormGroup;
  constructor(
    private fb : FormBuilder,
    private transactionService : TransactionService
  ) { }

  tranfert(){
    this.transfertForm = this.fb.group({
      password : ['', Validators.required],
      destinataire : ['', Validators.required],
      montant : ['', Validators.required]
    })
  }

  ngOnInit(): void {
    this.tranfert();
  }

  transfertMoney(){
    this.message = null;
    this.progress = true
   var info = {
    number_phone : localStorage.getItem('number_phone'),
    password : this.transfertForm.value.password,
    destinataire : this.transfertForm.value.destinataire,
    montant : this.transfertForm.value.montant
  }
  this.transactionService.trensfert(info)
  .then((message : any)=>{
    this.message = message.message
    console.log(message.message); 
    
    
  })
  .catch((error)=>{
    // console.log(error.error.message);
    this.message = error.error.message
    
  })
  }
}
