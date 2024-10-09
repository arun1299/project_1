import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Add_estimatesComponent } from './add_estimates.component';



const routes: Routes = [
  {
    path: '',
    component: Add_estimatesComponent,
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})


export class Add_Estimates_routingModule {
}
