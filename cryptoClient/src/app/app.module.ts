import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AccountsService } from '../app/services/accounts/accounts.service'
import { AccountsInterceptor } from '../app/services/accounts/accounts.interceptor'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './account/login/login.component';
import { RegisterComponent } from './account/register/register.component';
import { MyAccountComponent } from './account/my-account/my-account.component';
import { TransactionService } from '../app/services/transactions/transaction.service';
import { EcommerceService } from '../app/services/ecommerce/ecommerce.service' ;
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MenuComponent } from './wallet/menu/menu.component';
import { OperationsComponent } from './wallet/operations/operations.component';
import { SuiviConsoComponent } from './wallet/suivi-conso/suivi-conso.component';
import { TransfertMoneyComponent } from './wallet/transfert-money/transfert-money.component';
import { CodeAchatComponent } from './wallet/code-achat/code-achat.component';
import { NavComponent } from './wallet/nav/nav.component';
import { MarchandComponent } from './ecommerce/marchand/marchand.component';
import { PaymentComponent } from './ecommerce/payment/payment.component';
import { PaymentFactureComponent } from './wallet/payment-facture/payment-facture.component';
import { AnchorsService } from '../app/services/anchors.service' ;
import { FlexLayoutModule } from '@angular/flex-layout';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatToolbarModule} from '@angular/material/toolbar';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    MyAccountComponent,
    MenuComponent,
    OperationsComponent,
    SuiviConsoComponent,
    TransfertMoneyComponent,
    CodeAchatComponent,
    NavComponent,
    MarchandComponent,
    PaymentComponent,
    PaymentFactureComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatProgressBarModule,
    FlexLayoutModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatToolbarModule
  ],
  providers: [
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
  bootstrap: [AppComponent]
})
export class AppModule { }
