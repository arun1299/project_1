import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UnitComponent } from './unit.component';
import { Unit_routingModule } from './unit_routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,Unit_routingModule,SharedModule
  ],
  declarations: [UnitComponent]
})
export class UnitModule { }
