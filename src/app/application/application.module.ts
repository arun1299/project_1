import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeatureModuleRoutingModule } from './application-routing.module';
import { ApplicationComponent } from './application.component';
import { SharedModule } from '../shared/sharedIndex';
import { SideMenuComponent } from './common/side-menu/side-menu.component';
import { HeaderComponent } from './common/header/header.component';
import { SpinnerComponent } from './common/spinner/spinner.component';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  declarations: [
    ApplicationComponent,
    SideMenuComponent,
    HeaderComponent,
    SpinnerComponent,
  ],
  imports: [CommonModule, FeatureModuleRoutingModule, SharedModule,MatTooltipModule],
})
export class FeatureModuleModule {}
