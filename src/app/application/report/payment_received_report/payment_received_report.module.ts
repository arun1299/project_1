import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Payment_received_reportComponent } from './payment_received_report.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { INRModule } from 'src/app/pipe/INR/INR.module';
import { PaymentReceivedRoutingModule } from './payment_received_routing.module';

@NgModule({
  imports: [
    CommonModule,SharedModule,INRModule,PaymentReceivedRoutingModule
  ],
  declarations: [Payment_received_reportComponent]
})
export class Payment_received_reportModule { }
