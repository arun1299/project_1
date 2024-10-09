
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Epf_reportComponent } from './epf_report.component';


const routes: Routes = [
  {
    path: '',
    component: Epf_reportComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})



export class Epf_reportRoutingModule {
}
