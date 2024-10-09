import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Load_transactionsComponent } from './load_transactions.component';
import { Load_transaction_routingModule } from './load_transaction_routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { INRModule } from 'src/app/pipe/INR/INR.module';

@NgModule({
  imports: [
    CommonModule,Load_transaction_routingModule,SharedModule,INRModule
  ],
  declarations: [Load_transactionsComponent]
})
export class Load_transactionsModule { }
