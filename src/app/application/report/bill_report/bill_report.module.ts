import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Bill_reportComponent } from './bill_report.component';
import { BillReportRoutingModule } from './bill_report_routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { INRModule } from 'src/app/pipe/INR/INR.module';

@NgModule({
  imports: [
    CommonModule,SharedModule,BillReportRoutingModule,INRModule
  ],
  declarations: [Bill_reportComponent]
})
export class Bill_reportModule { }
