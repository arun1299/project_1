
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HrComponent } from './hr.component';


const routes: Routes = [
  {
    path: '',
    component: HrComponent,
    children: [
      {
        path: 'employee',
        loadChildren: () =>  import('./employee/employee.module').then((m) => m.EmployeeModule ),
      },
      {
        path: 'attendance',
        loadChildren: () =>  import('./attendance/attendance.module').then((m) => m.AttendanceModule ),
      },
      {
        path: 'payroll',
        loadChildren: () =>  import('./pay-roll/pay-roll.module').then((m) => m.PayRollModule ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HrRoutingModule {}
