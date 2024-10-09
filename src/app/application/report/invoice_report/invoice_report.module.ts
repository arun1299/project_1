import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Invoice_reportComponent } from './invoice_report.component';
import { InvoiceReportRoutingModule } from './invoice_report_routing.module';
import { INRModule } from 'src/app/pipe/INR/INR.module';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,InvoiceReportRoutingModule,INRModule,SharedModule
  ],
  declarations: [Invoice_reportComponent]
})
export class Invoice_reportModule { }
