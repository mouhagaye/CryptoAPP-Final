import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab1Page } from './tab1.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { Tab1PageRoutingModule } from './tab1-routing.module';

import { ReactiveFormsModule } from '@angular/forms';
import { TransactionService } from 'src/app/services/transactions/transaction.service';
import { EcommerceService } from 'src/app/services/ecommerce/ecommerce.service' ;
import { AccountsService } from 'src/app/services/accounts/accounts.service'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { AccountsInterceptor } from 'src/app/services/accounts/accounts.interceptor'

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    Tab1PageRoutingModule,HttpClientModule,
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
  declarations: [Tab1Page]
})
export class Tab1PageModule {}
