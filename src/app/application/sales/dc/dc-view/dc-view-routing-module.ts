

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DcViewComponent } from './dc-view.component';

const routes: Routes = [
  {
    path: '',
    component: DcViewComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class DcViewRoutingModule {
}
