import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VendorComponent } from './vendor.component';
import { VendorRoutingModule } from './vendor-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { INRModule } from 'src/app/pipe/INR/INR.module';
@NgModule({
  imports: [
    CommonModule,VendorRoutingModule,SharedModule,INRModule
  ],
  declarations: [VendorComponent]
})
export class VendorModule { }
