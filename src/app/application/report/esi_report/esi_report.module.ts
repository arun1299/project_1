import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Esi_reportComponent } from './esi_report.component';
import { Esi_reportRoutingModule } from './esi_report_routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { INRModule } from 'src/app/pipe/INR/INR.module';

@NgModule({
  imports: [
    CommonModule,Esi_reportRoutingModule,SharedModule,INRModule
  ],
  declarations: [Esi_reportComponent]
})
export class Esi_reportModule { }
