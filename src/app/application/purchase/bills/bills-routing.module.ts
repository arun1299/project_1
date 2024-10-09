import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BillsComponent } from './bills.component';


const routes: Routes = [
  {
    path: '',
    component:BillsComponent
    ,

    children: [

      {
        path: '',  loadChildren: () => import('./bill-list/bill-list.module').then( (m) => m.BillListModule ),
      },
      // {
      //   path: 'po-list', loadChildren: () => import('./po-list/po-list.module').then( (m) => m.PoListModule ),
      // },

      {
        path: 'add-bill',  loadChildren: () => import('./add-bill/add-bill.module').then( (m) => m.AddBillModule ),
      },
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class BillsRoutingModule {
}
