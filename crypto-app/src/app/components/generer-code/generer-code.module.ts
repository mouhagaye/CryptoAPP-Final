import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GenererCodePageRoutingModule } from './generer-code-routing.module';

import { GenererCodePage } from './generer-code.page';

import { ReactiveFormsModule } from '@angular/forms';
import { TransactionService } from 'src/app/services/transactions/transaction.service';
import { EcommerceService } from 'src/app/services/ecommerce/ecommerce.service' ;
import { AccountsService } from 'src/app/services/accounts/accounts.service'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { AccountsInterceptor } from 'src/app/services/accounts/accounts.interceptor'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GenererCodePageRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [
    AccountsService,
    TransactionService,
    EcommerceService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AccountsInterceptor,
      multi: true
    }
  ],
  declarations: [GenererCodePage]
})
export class GenererCodePageModule {}
