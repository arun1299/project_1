
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Po_reportComponent } from './po_report.component';

const routes: Routes = [
  {
    path: '',
    component: Po_reportComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class Po_report_routingModule {
}
