import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Payment_made_reportComponent } from './payment_made_report.component';
import { PaymentMadeReportRoutingModule } from './payment_made_report_routing.module';
import { SharedModule } from 'src/app/shared/sharedIndex';
import { INRModule } from 'src/app/pipe/INR/INR.module';

@NgModule({
  imports: [
    CommonModule,PaymentMadeReportRoutingModule,SharedModule,INRModule
  ],
  declarations: [Payment_made_reportComponent]
})
export class Payment_made_reportModule { }
