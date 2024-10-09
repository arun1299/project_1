
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EstimatesComponent } from './estimates.component';


const routes: Routes = [
  {
    path: '',
    component: EstimatesComponent,

    children: [

      {
        path: '',  loadChildren: () => import('./estimates_list/estimates_list.module').then( (m) => m.Estimates_listModule ),
      },
      {
        path: 'estimate-list',  loadChildren: () => import('./estimates_list/estimates_list.module').then( (m) => m.Estimates_listModule ),
      },

      {
        path: 'add-estimate',  loadChildren: () => import('./add_estimates/add_estimates.module').then( (m) => m.Add_estimatesModule),
      },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})


export class Estimates_routingModule {
}
