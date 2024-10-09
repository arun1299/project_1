import { NgSelectModule } from '@ng-select/ng-select';
import { Employee_account_report_routingModule } from './employee_account_report_routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Employee_account_reportComponent } from './employee_account_report.component';
import { INRModule } from 'src/app/pipe/INR/INR.module';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,Employee_account_report_routingModule,INRModule,SharedModule,NgSelectModule
  ],
  declarations: [Employee_account_reportComponent]
})
export class Employee_account_reportModule { }
