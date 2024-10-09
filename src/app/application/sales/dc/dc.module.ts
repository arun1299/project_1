import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DcComponent } from './dc.component';
import { DcRoutingModule } from './dc-routing-module';
import { SharedModule } from 'src/app/shared/shared.module';
import { INRModule } from 'src/app/pipe/INR/INR.module';
import { FormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
@NgModule({
  imports: [
    CommonModule,DcRoutingModule,SharedModule,INRModule,FormsModule,NgxDatatableModule
  ],
  declarations: [DcComponent]
})
export class DcModule { }
