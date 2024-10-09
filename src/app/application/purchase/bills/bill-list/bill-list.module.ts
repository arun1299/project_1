import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BillListComponent } from './bill-list.component';
import { BillListRoutingModule } from './bill-list-routing.module';
import { INRModule } from 'src/app/pipe/INR/INR.module';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgSelectModule } from '@ng-select/ng-select';
import { BillViewComponent } from '../bill-view/bill-view.component';

@NgModule({
  imports: [
    CommonModule,BillListRoutingModule,INRModule,FormsModule,SharedModule,NgxDatatableModule,NgSelectModule
  ],
  declarations: [BillListComponent,BillViewComponent]
})
export class BillListModule { }
