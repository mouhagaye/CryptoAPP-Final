import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AccountsService } from '../app/services/accounts/accounts.service'
import { AccountsInterceptor } from '../app/services/accounts/accounts.interceptor'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TransactionService } from '../app/services/transactions/transaction.service';
import { EcommerceService } from '../app/services/ecommerce/ecommerce.service' ;
import { AnchorsService } from '../app/services/anchors.service';


@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,HttpClientModule,FormsModule,ReactiveFormsModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy},
    AccountsService,
    TransactionService,
    EcommerceService,
    AnchorsService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AccountsInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
