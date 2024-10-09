import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Payment_received_reportComponent } from './payment_received_report.component';

const routes: Routes = [
  {
    path: '',
    component: Payment_received_reportComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})


export class PaymentReceivedRoutingModule {
}
