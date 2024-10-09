

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MaterialStocklistComponent } from './material-stocklist.component';


const routes: Routes = [
  {
    path: '',
    component: MaterialStocklistComponent

  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})


export class MaterialStocklistRoutingModule {
}
