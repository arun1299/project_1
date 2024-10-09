import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Vendor_balance_reportComponent } from './vendor_balance_report.component';



const routes: Routes = [
  {
    path: '',
    component:Vendor_balance_reportComponent ,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class VendorBalanceReportRoutingModule {
}
