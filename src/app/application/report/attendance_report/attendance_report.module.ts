import { Attendance_report_routingModule } from './attendance_report_routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Attendance_reportComponent } from './attendance_report.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  imports: [
    CommonModule,Attendance_report_routingModule,SharedModule,NgSelectModule
  ],
  declarations: [Attendance_reportComponent]
})
export class Attendance_reportModule { }
