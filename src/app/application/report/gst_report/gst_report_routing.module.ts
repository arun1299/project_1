import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Gst_reportComponent } from './gst_report.component';

const routes: Routes = [
  {
    path: '',
    component: Gst_reportComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class Gst_report_routingModule {
}
