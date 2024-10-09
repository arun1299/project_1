import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SalesComponent } from './sales.component';
import { SalesRoutingModule } from './sales-routing.module';

@NgModule({
  imports: [
    CommonModule,SalesRoutingModule
  ],
  declarations: [SalesComponent]
})
export class SalesModule { }
