import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DcListComponent } from './dc-list.component';




const routes: Routes = [
  {
    path: '',
    component: DcListComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})



export class DcListRoutingModule {
}
