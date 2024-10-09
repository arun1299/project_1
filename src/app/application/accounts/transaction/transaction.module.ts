import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransactionComponent } from './transaction.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { TransactionRoutingModule } from './transaction-routing.module';
import { INRModule } from 'src/app/pipe/INR/INR.module';
import { NgSelectModule } from '@ng-select/ng-select';



@NgModule({
  imports: [
    CommonModule,
    TransactionRoutingModule,SharedModule,INRModule,NgSelectModule
  ],
  declarations: [TransactionComponent]
})
export class TransactionModule { }
