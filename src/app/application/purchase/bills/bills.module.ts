import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BillsComponent } from './bills.component';
import { BillsRoutingModule } from './bills-routing.module';

@NgModule({
  imports: [
    CommonModule,BillsRoutingModule
  ],
  declarations: [BillsComponent]
})
export class BillsModule { }
