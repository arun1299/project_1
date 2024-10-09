import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Menu_settingComponent } from './menu_setting.component';




const routes: Routes = [
  {
    path: '',
    component:Menu_settingComponent
    ,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class Menu_setting_routingModule {
}
