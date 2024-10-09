
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Organisation_profileComponent } from './organisation_profile.component';


const routes: Routes = [
  {
    path: '',
    component:Organisation_profileComponent
    ,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})



export class Organisation_profile_routingModule {
}
