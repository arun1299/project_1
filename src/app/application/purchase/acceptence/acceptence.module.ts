import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AcceptenceComponent } from './acceptence.component';
import { AcceptenceRoutingModule } from './acceptence-routing-module';
import { INRModule } from 'src/app/pipe/INR/INR.module';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgSelectModule } from '@ng-select/ng-select';
@NgModule({
  imports: [
    CommonModule,AcceptenceRoutingModule,INRModule,FormsModule,SharedModule,NgxDatatableModule,NgSelectModule
  ],
  declarations: [AcceptenceComponent]
})
export class AcceptenceModule { }
