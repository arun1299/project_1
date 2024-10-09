import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Vendor_balance_reportComponent } from './vendor_balance_report.component';
import { VendorBalanceReportRoutingModule } from './vendor_balance_report_routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { INRModule } from 'src/app/pipe/INR/INR.module';


@NgModule({
  imports: [
    CommonModule,VendorBalanceReportRoutingModule,SharedModule,INRModule
  ],
  declarations: [Vendor_balance_reportComponent]
})
export class Vendor_balance_reportModule { }
