


import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddBillComponent } from './add-bill.component';

const routes: Routes = [
  {
    path: '',
    component: AddBillComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class AddBillRoutingmodule {
}
