
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StoreComponent } from './store.component';


const routes: Routes = [
  {
    path: '',
    component: StoreComponent
    ,
    children: [
      {
        path: 'inward',
        loadChildren: () =>  import('./inward/inward.module').then((m) => m.InwardModule ),
      },
      {
        path: 'outward-production',
        loadChildren: () =>  import('./outward-production/outward-production.module').then((m) => m.OutwardProductionModule ),
      },

      {
        path: 'material-stocklist',
        loadChildren: () =>  import('./material-stocklist/material-stocklist.module').then((m) => m.MaterialStocklistModule ),
      },


     
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class StoreRoutingModule {
}
