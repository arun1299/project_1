import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages.component';

const routes: Routes = [
  { path: '', component: PagesComponent ,children:[
    {
      path: 'add-page',
      loadChildren: () =>
        import('./add-page/add-page.module').then((m) => m.AddPageModule),
    },
    {
      path: 'add-pages',
      loadChildren: () =>
        import('./add-pages/add-pages.module').then((m) => m.AddPagesModule),
    },
  ]
},
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
