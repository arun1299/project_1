import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Bill_reportComponent } from './bill_report.component';

const routes: Routes = [
  {
    path: '',
    component: Bill_reportComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})


export class BillReportRoutingModule {
}
