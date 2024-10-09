import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Sales_by_customerComponent } from './sales_by_customer.component';
Sales_by_customerComponent

const routes: Routes = [
  {
    path: '',
    component: Sales_by_customerComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SalesByCustomerRoutingModule {
}
