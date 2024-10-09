import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Customer_balance_reportComponent } from './customer_balance_report.component';
import { CustomerBalanceRoutingmodule } from './customer_balance_routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { INRModule } from 'src/app/pipe/INR/INR.module';

@NgModule({
  imports: [
    CommonModule,CustomerBalanceRoutingmodule,SharedModule,INRModule
  ],
  declarations: [Customer_balance_reportComponent]
})
export class Customer_balance_reportModule { }
