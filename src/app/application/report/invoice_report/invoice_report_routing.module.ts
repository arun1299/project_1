import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Invoice_reportComponent } from './invoice_report.component';


const routes: Routes = [
  {
    path: '',
    component: Invoice_reportComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InvoiceReportRoutingModule {
}
