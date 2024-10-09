import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Prifix_settingComponent } from './prifix_setting.component';
import { Prifix_setting_routingModule } from './prifix_setting_routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,Prifix_setting_routingModule,SharedModule
  ],
  declarations: [Prifix_settingComponent]
})
export class Prifix_settingModule { }
