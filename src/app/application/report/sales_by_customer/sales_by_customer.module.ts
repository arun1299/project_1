import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Sales_by_customerComponent } from './sales_by_customer.component';
import { SalesByCustomerRoutingModule } from './sales_by_customer-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { INRModule } from 'src/app/pipe/INR/INR.module';

@NgModule({
  imports: [
    CommonModule,SalesByCustomerRoutingModule,SharedModule,INRModule
  ],
  declarations: [Sales_by_customerComponent]
})
export class Sales_by_customerModule { }
