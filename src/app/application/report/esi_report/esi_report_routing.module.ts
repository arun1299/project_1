import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Esi_reportComponent } from './esi_report.component';

const routes: Routes = [
  {
    path: '',
    component: Esi_reportComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})


export class Esi_reportRoutingModule {
}
