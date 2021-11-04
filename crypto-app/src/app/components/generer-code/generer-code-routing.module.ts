import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GenererCodePage } from './generer-code.page';

const routes: Routes = [
  {
    path: '',
    component: GenererCodePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GenererCodePageRoutingModule {}
