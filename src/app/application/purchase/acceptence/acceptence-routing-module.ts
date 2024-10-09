import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AcceptenceComponent } from './acceptence.component';


const routes: Routes = [
  {
    path: '',
    component:AcceptenceComponent
    ,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})


export class AcceptenceRoutingModule {
}
