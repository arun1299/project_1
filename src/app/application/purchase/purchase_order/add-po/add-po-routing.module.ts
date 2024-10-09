import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddPoComponent } from './add-po.component';


const routes: Routes = [
  {
    path: '',
    component: AddPoComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class AddPoRoutingmodule {
}
