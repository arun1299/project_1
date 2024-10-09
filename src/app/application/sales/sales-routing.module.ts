
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SalesComponent } from './sales.component';


const routes: Routes = [
  {
    path: '',
    component: SalesComponent
    ,
    children: [
      {
        path: 'customer',
        loadChildren: () =>  import('./customer/customer.module').then((m) => m.CustomerModule ),
      },
      {
        path: 'invoice',
        loadChildren: () =>  import('./invoice/invoice.module').then((m) => m.InvoiceModule ),
      },
      {
        path: 'delivery_challan',
        loadChildren: () =>  import('./dc/dc.module').then((m) => m.DcModule ),
      },
      {
        path: 'estimates',
        loadChildren: () =>  import('./estimates/estimates.module').then((m) => m.EstimatesModule ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class SalesRoutingModule {
}
