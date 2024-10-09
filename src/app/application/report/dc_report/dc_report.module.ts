import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Dc_reportComponent } from './dc_report.component';
import { Dc_report_routingmodule } from './dc_report_routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { INRModule } from 'src/app/pipe/INR/INR.module';

@NgModule({
  imports: [
    CommonModule,Dc_report_routingmodule,SharedModule,INRModule
  ],
  declarations: [Dc_reportComponent]
})
export class Dc_reportModule { }
