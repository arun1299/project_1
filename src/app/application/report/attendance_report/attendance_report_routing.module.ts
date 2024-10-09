import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Attendance_reportComponent } from './attendance_report.component';



const routes: Routes = [
  {
    path: '',
    component: Attendance_reportComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})


export class Attendance_report_routingModule {
}
