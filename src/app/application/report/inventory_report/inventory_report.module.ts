import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Inventory_reportComponent } from './inventory_report.component';
import { InventoryReportRoutingModule } from './inventory_report_routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { INRModule } from 'src/app/pipe/INR/INR.module';

@NgModule({
  imports: [
    CommonModule,InventoryReportRoutingModule,SharedModule,INRModule
  ],
  declarations: [Inventory_reportComponent]
})
export class Inventory_reportModule { }
