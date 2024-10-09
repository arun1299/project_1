import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AttendanceComponent } from './attendance.component';
import { AttendanceRoutingModule } from './attedance_routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { INRModule } from 'src/app/pipe/INR/INR.module';

@NgModule({
  imports: [
    CommonModule,AttendanceRoutingModule,SharedModule,INRModule,FormsModule,ReactiveFormsModule
  ],
  declarations: [AttendanceComponent]
})
export class AttendanceModule { }
