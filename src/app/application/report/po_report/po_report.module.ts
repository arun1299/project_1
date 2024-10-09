
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Po_reportComponent } from './po_report.component';
import { Po_report_routingModule } from './po_report_routing.module';
import { INRModule } from 'src/app/pipe/INR/INR.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  imports: [
    CommonModule,Po_report_routingModule,SharedModule,INRModule,NgSelectModule
  ],
  declarations: [Po_reportComponent]
})
export class Po_reportModule { }
