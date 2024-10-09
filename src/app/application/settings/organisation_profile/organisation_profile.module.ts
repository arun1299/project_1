import { Organisation_profile_routingModule } from './organisation_profile_routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Organisation_profileComponent } from './organisation_profile.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,Organisation_profile_routingModule,SharedModule
  ],
  declarations: [Organisation_profileComponent]
})
export class Organisation_profileModule { }
