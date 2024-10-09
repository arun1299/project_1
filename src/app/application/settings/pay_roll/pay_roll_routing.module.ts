import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Pay_rollComponent } from './pay_roll.component';

const routes: Routes = [
  {
    path: '',
    component:Pay_rollComponent
    ,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})


export class Pay_roll_routingModule {
}
