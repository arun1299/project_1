
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Employee_account_reportComponent } from './employee_account_report.component';



const routes: Routes = [
  {
    path: '',
    component: Employee_account_reportComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class Employee_account_report_routingModule {
}
