import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Tcs_tds_reportComponent } from './tcs_tds_report.component';

const routes: Routes = [
  {
    path: '',
    component: Tcs_tds_reportComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
  export class TdsTcsRoutingModule {
  }
