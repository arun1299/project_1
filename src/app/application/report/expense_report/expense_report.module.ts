import { NgSelectModule } from '@ng-select/ng-select';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Expense_reportComponent } from './expense_report.component';
import { Expense_report_routingModule } from './expense_report_routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { INRModule } from 'src/app/pipe/INR/INR.module';

@NgModule({
  imports: [
    CommonModule,Expense_report_routingModule,SharedModule,INRModule,NgSelectModule
  ],
  declarations: [Expense_reportComponent]
})
export class Expense_reportModule { }
