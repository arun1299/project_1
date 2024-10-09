import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Menu_settingComponent } from './menu_setting.component';
import { Menu_setting_routingModule } from './menu_setting_routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,Menu_setting_routingModule,SharedModule
  ],
  declarations: [Menu_settingComponent]
})
export class Menu_settingModule { }
