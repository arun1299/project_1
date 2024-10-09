import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemsErpComponent } from './items-erp.component';
import { ItemsErpRoutingModule } from './items-erp-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,ItemsErpRoutingModule,SharedModule
  ],
  declarations: [ItemsErpComponent]
})
export class ItemsErpModule { }
