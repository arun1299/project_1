
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PurchaseComponent } from './purchase.component';

const routes: Routes = [
  {
    path: '',
    component: PurchaseComponent,
    children: [
      {
        path: 'vendor',
        loadChildren: () =>  import('./vendor/vendor.module').then((m) => m.VendorModule ),
      },
      {
        path: 'purchase-request',
        loadChildren: () =>  import('./purchase-request/purchase-request.module').then((m) => m.PurchaseRequestModule ),
      },
      {
        path: 'purchase_order',
        loadChildren: () =>  import('./purchase_order/purchase_order.module').then((m) => m.Purchase_orderModule ),
      },
      {
        path: 'bills',
        loadChildren: () =>  import('./bills/bills.module').then((m) => m.BillsModule),
      },
      {
        path: 'acceptence',
        loadChildren: () =>  import('./acceptence/acceptence.module').then((m) => m.AcceptenceModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class purchaseRoutingModule {}
