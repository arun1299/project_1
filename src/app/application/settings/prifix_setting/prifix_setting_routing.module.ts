import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Prifix_settingComponent } from './prifix_setting.component';




const routes: Routes = [
  {
    path: '',
    component:Prifix_settingComponent
    ,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class Prifix_setting_routingModule {
}
