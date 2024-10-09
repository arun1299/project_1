import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Estimates_listComponent } from './estimates_list.component';




const routes: Routes = [
  {
    path: '',
    component: Estimates_listComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class Estimates_list_routingModule {
}
