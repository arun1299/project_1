import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HrComponent } from './hr.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { HrRoutingModule } from './hr_routing.module';


@NgModule({
  imports: [
    CommonModule,SharedModule,HrRoutingModule
  ],
  declarations: [HrComponent]
})
export class HrModule { }
