import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'signup',
    loadChildren: () => import('./signup/signup.module').then( m => m.SignupPageModule)
  },
  {
    path: 'transfert',
    loadChildren: () => import('./components/transfert/transfert.module').then( m => m.TransfertPageModule)
  },
  {
    path: 'generer-code',
    loadChildren: () => import('./components/generer-code/generer-code.module').then( m => m.GenererCodePageModule)
  },
  {
    path: 'payement-marchand',
    loadChildren: () => import('./components/payement-marchand/payement-marchand.module').then( m => m.PayementMarchandPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
