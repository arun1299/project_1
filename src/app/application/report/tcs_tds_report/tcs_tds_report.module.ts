import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Tcs_tds_reportComponent } from './tcs_tds_report.component';
import { TdsTcsRoutingModule } from './tds_tcs_routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { INRModule } from 'src/app/pipe/INR/INR.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,TdsTcsRoutingModule,SharedModule,INRModule,NgxDatatableModule,ReactiveFormsModule
  ],
  declarations: [Tcs_tds_reportComponent]
})
export class Tcs_tds_reportModule { }
