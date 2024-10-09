import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Gst_reportComponent } from './gst_report.component';
import { Gst_report_routingModule } from './gst_report_routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { INRModule } from 'src/app/pipe/INR/INR.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,Gst_report_routingModule,SharedModule,INRModule,NgxDatatableModule,ReactiveFormsModule
  ],
  declarations: [Gst_reportComponent]
})
export class Gst_reportModule { }
