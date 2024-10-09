

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DcComponent } from './dc.component';


const routes: Routes = [
  {
    path: '',
    component:DcComponent ,

    children: [
            {
              path: '',  loadChildren: () => import('./dc-list/dc-list.module').then( (m) => m.DcListModule ),
            },

            {
              path: 'dc_list',  loadChildren: () => import('./dc-list/dc-list.module').then( (m) => m.DcListModule ),
            },

            {
              path: 'add_dc',  loadChildren: () => import('./add-dc/add-dc.module').then( (m) => m.AddDcModule ),
            },
    ]
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})


export class DcRoutingModule {
}
