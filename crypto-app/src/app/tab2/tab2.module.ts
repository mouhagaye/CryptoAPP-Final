import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab2Page } from './tab2.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { Tab2PageRoutingModule } from './tab2-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { TransactionService } from 'src/app/services/transactions/transaction.service';
import { EcommerceService } from 'src/app/services/ecommerce/ecommerce.service' ;
import { AccountsService } from 'src/app/services/accounts/accounts.service'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AccountsInterceptor } from 'src/app/services/accounts/accounts.interceptor';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    Tab2PageRoutingModule,
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
  declarations: [Tab2Page]
})
export class Tab2PageModule {}
