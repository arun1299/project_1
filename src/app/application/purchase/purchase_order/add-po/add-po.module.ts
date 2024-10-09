import { AddPoRoutingmodule } from './add-po-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddPoComponent } from './add-po.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgSelectModule } from '@ng-select/ng-select';
@NgModule({
  imports: [
    CommonModule,SharedModule,AddPoRoutingmodule,NgSelectModule
  ],
  declarations: [AddPoComponent]
})
export class AddPoModule { }
