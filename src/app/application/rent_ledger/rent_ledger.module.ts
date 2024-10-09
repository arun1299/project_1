import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Rent_ledgerComponent } from './rent_ledger.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { Rent_ledger_routingModule } from './rent_ledger_routing.module';

@NgModule({
  imports: [
    CommonModule,SharedModule,Rent_ledger_routingModule
  ],
  declarations: [Rent_ledgerComponent]
})
export class Rent_ledgerModule { }
