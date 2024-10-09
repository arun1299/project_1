import { SharedModule } from 'src/app/shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Pay_rollComponent } from './pay_roll.component';
import { Pay_roll_routingModule } from './pay_roll_routing.module';
import { INRModule } from 'src/app/pipe/INR/INR.module';

@NgModule({
  imports: [
    CommonModule,Pay_roll_routingModule,SharedModule,INRModule
  ],
  declarations: [Pay_rollComponent]
})
export class Pay_rollModule { }
