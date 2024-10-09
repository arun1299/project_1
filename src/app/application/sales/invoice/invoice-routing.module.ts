
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InvoiceComponent } from './invoice.component';

const routes: Routes = [
  {
    path: '',
    component: InvoiceComponent,

    children: [

      {
        path: '',  loadChildren: () => import('./invoice-list/invoice-list.module').then( (m) => m.InvoiceListModule ),
      },
      {
        path: 'invoice-list', loadChildren: () => import('./invoice-list/invoice-list.module').then( (m) => m.InvoiceListModule ),
      },

      {
        path: 'add-invoice',  loadChildren: () => import('./add-invoice/add-invoice.module').then( (m) => m.AddInvoiceModule ),
      },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})


export class InvoiceRoutingModule {
}
