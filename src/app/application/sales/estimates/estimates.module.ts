import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EstimatesComponent } from './estimates.component';
import { Estimates_routingModule } from './estimates_routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { INRModule } from 'src/app/pipe/INR/INR.module';


@NgModule({
  imports: [
    CommonModule,Estimates_routingModule,SharedModule,INRModule
  ],
  declarations: [EstimatesComponent]
})
export class EstimatesModule { }
