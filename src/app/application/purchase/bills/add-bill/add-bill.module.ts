import { NgSelectModule } from '@ng-select/ng-select';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddBillComponent } from './add-bill.component';
import { AddBillRoutingmodule } from './add-bill-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,AddBillRoutingmodule,SharedModule,NgSelectModule
  ],
  declarations: [AddBillComponent]
})
export class AddBillModule { }
