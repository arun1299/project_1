import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExpenseComponent } from './expense.component';
import { ExpenseRoutingModule } from './expense-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { INRModule } from 'src/app/pipe/INR/INR.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  imports: [
    CommonModule,ExpenseRoutingModule,ReactiveFormsModule,INRModule,NgSelectModule,SharedModule
  ],
  declarations: [ExpenseComponent]
})
export class ExpenseModule { }
