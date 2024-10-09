import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaymentMadeComponent } from './payment-made.component';


const routes: Routes = [
  {
    path: '',
    component:PaymentMadeComponent
    ,
  },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class PaymentMadeRoutingModule {
}
