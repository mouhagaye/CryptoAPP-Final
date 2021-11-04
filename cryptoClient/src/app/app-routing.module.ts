import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './account/login/login.component';
import { MyAccountComponent } from './account/my-account/my-account.component';
import { RegisterComponent } from './account/register/register.component';
import { MarchandComponent } from './ecommerce/marchand/marchand.component';
import { PaymentComponent } from './ecommerce/payment/payment.component';
import { AccountsGuard } from './services/accounts/accounts.guard'
import { CodeAchatComponent } from './wallet/code-achat/code-achat.component';
import { PaymentFactureComponent } from './wallet/payment-facture/payment-facture.component';
import { SuiviConsoComponent } from './wallet/suivi-conso/suivi-conso.component';
import { TransfertMoneyComponent } from './wallet/transfert-money/transfert-money.component';


const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path : 'login', component : LoginComponent },
  { path : 'register', component : RegisterComponent},
  { path: 'account', component :  MyAccountComponent, canActivate : [AccountsGuard], children : [
    { path : 'wallet', component : SuiviConsoComponent },
    { path : 'tranfert', component : TransfertMoneyComponent },
    { path : 'generer-code', component : CodeAchatComponent },
    { path : 'code-marchand', component : MarchandComponent },
    { path : 'payment-marchand', component : PaymentComponent },
    { path : 'payment-facture', component : PaymentFactureComponent }
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
