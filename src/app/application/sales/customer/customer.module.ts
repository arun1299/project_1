import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerComponent } from './customer.component';
import { CustomerRoutingModule } from './customer-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { INRModule } from 'src/app/pipe/INR/INR.module';


@NgModule({
  imports: [
    CommonModule,CustomerRoutingModule,SharedModule,INRModule
  ],
  declarations: [CustomerComponent]
})
export class CustomerModule { }
