import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Epf_reportComponent } from './epf_report.component';
import { Epf_reportRoutingModule } from './epf_report_routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { INRModule } from 'src/app/pipe/INR/INR.module';


@NgModule({
  imports: [
    CommonModule,Epf_reportRoutingModule,SharedModule,INRModule
  ],
  declarations: [Epf_reportComponent]
})
export class Epf_reportModule { }
