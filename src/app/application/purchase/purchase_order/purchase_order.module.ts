import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Purchase_orderComponent } from './purchase_order.component';
import { PurchaseOrderRoutingModule } from './purchase-order-routing.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgSelectModule } from '@ng-select/ng-select';
@NgModule({
  imports: [
    CommonModule,PurchaseOrderRoutingModule,NgxDatatableModule,NgSelectModule
  ],
  declarations: [Purchase_orderComponent]
})
export class Purchase_orderModule { }
