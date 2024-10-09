
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Payment_made_reportComponent } from './payment_made_report.component';


const routes: Routes = [
  {
    path: '',
    component:Payment_made_reportComponent ,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class PaymentMadeReportRoutingModule {
}
