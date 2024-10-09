import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsComponent } from './settings.component';
import { SettingsErpRoutingModule } from './settings-routing.module';
import { SidemenuComponent } from '../settings/sidemenu/sidemenu.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  imports: [
    CommonModule,SettingsErpRoutingModule,SharedModule
  ],
  declarations: [SettingsComponent,SidemenuComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SettingsModule { }
