import { NgSelectModule } from '@ng-select/ng-select';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PayRollComponent } from './pay-roll.component';
import { PayRollRoutingModule } from './pay-roll-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { INRModule } from 'src/app/pipe/INR/INR.module';

@NgModule({
  imports: [
    CommonModule,PayRollRoutingModule,SharedModule,INRModule,NgSelectModule
  ],
  declarations: [PayRollComponent]
})
export class PayRollModule { }
