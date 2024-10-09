
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ItemsErpComponent } from './items-erp.component';


const routes: Routes = [
  {
    path: '',
    component: ItemsErpComponent,
    children: [
      {
        path: 'item-list',
        loadChildren: () =>  import('./item-list/item-list.module').then((m) => m.ItemListModule ),
      },
      {
        path: 'item-category',
        loadChildren: () =>  import('./item-category/item-category.module').then((m) => m.ItemCategoryModule ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ItemsErpRoutingModule {}
