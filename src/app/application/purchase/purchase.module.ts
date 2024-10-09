import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PurchaseComponent } from './purchase.component';
import { purchaseRoutingModule } from './purchase-routing.module';

@NgModule({
  imports: [
    CommonModule,purchaseRoutingModule
  ],
  declarations: [PurchaseComponent]
})
export class PurchaseModule { }
