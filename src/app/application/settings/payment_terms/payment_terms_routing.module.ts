import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Payment_termsComponent } from './payment_terms.component';

const routes: Routes = [
  {
    path: '',
    component:Payment_termsComponent
    ,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})


export class Payment_terms_routingModule {
}
