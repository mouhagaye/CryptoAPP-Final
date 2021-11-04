import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountsService } from 'src/app/services/accounts/accounts.service';
import { TransactionService } from 'src/app/services/transactions/transaction.service';

@Component({
  selector: 'app-payment-facture',
  templateUrl: './payment-facture.component.html',
  styleUrls: ['./payment-facture.component.scss']
})
export class PaymentFactureComponent implements OnInit {
  facture : any
  message : any
  progress : any
  desabledButton : Boolean = false;

  transfertForm : FormGroup;
  constructor(
    private fb : FormBuilder,
    private accountService : AccountsService,
    private transactionService : TransactionService
  ) {}

  transfert(){
    this.transfertForm = this.fb.group({
      numero_facture : ['', Validators.required],
    })
  }

  ngOnInit(): void {
    this.transfert();
  }

  getFacture(){
    this.desabledButton = true;
    this.message = null;
    this.progress = true
    var facture = {
      numero_facture : this.transfertForm.value.numero_facture,
    }
    this.accountService.getFacture(facture)
    .then((facture : any)=>{
      this.progress = false;
      this.facture = facture.message
    })
    .catch((error)=>{
      console.log(error);
    })  
  }
  payFacture(){
    console.log(this.facture); 
  }


}
