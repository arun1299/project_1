import { INRModule_WO } from './../../../../pipe/INR/INR_wo.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InvoiceListComponent } from './invoice-list.component';
import { INRModule } from 'src/app/pipe/INR/INR.module';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { Invoice_viewComponent } from '../invoice_view/invoice_view.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { InvoiceListRoutingModule } from './invoice-list-routing.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  imports: [
    CommonModule,INRModule,FormsModule,SharedModule,NgxDatatableModule,InvoiceListRoutingModule,NgSelectModule,MatTooltipModule,INRModule_WO

  ],
  declarations: [InvoiceListComponent,Invoice_viewComponent]
})
export class InvoiceListModule { }
