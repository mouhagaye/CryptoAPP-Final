import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EcommerceService } from 'src/app/services/ecommerce/ecommerce.service';
import { TransactionService } from 'src/app/services/transactions/transaction.service';

@Component({
  selector: 'app-paymant',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {
  message : any
  progress : any
  desabledButton : Boolean = false;

  transfertForm : FormGroup;
  constructor(
    private fb : FormBuilder,
    private ecommerceService : EcommerceService
  ) {}

  transfert(){
    this.transfertForm = this.fb.group({
      code_marchand : ['', Validators.required],
      price : ['', Validators.required],
    })
  }

  ngOnInit(): void {
    this.transfert();
  }

  transfertMoney(){
    this.desabledButton = true;
    this.message = null;
    this.progress = true
    var info = {
      number_phone : localStorage.getItem('number_phone'),
      code_marchand : this.transfertForm.value.code_marchand,
      price : this.transfertForm.value.price
    }
  
    this.ecommerceService.paymantMarchand(info)
    .then((message : any)=>{
      this.transfertForm.reset()
      this.progress = false;
      this.message = message.message
      this.desabledButton = false
    })
    .catch((error)=>{
      this.message = error.error.message;
      this.desabledButton = false
    })
  }
}
