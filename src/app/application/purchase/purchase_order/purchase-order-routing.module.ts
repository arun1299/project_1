import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Purchase_orderComponent } from './purchase_order.component';



const routes: Routes = [
  {
    path: '',
    component:Purchase_orderComponent
    ,

    children: [

      {
        path: '',  loadChildren: () => import('./po-list/po-list.module').then( (m) => m.PoListModule ),
      },
      {
        path: 'po-list', loadChildren: () => import('./po-list/po-list.module').then( (m) => m.PoListModule ),
      },

      {
        path: 'add-po',  loadChildren: () => import('./add-po/add-po.module').then( (m) => m.AddPoModule ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})


export class PurchaseOrderRoutingModule {
}
