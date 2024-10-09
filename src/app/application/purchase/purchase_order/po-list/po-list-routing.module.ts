import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PoListComponent } from './po-list.component';

const routes: Routes = [
  {
    path: '',
    component: PoListComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})




export class PoListRoutingmodule {
}
