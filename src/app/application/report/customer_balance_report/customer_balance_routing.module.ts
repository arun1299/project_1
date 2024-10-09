import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Customer_balance_reportComponent } from './customer_balance_report.component';



const routes: Routes = [
  {
    path: '',
    component: Customer_balance_reportComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class CustomerBalanceRoutingmodule {
}
