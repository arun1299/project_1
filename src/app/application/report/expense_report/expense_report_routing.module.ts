import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Expense_reportComponent } from './expense_report.component';



const routes: Routes = [
  {
    path: '',
    component: Expense_reportComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})


export class Expense_report_routingModule {
}
