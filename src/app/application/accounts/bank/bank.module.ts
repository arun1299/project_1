import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BankComponent } from './bank.component';
import { BankRoutingModule } from './bank-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ModalModule } from 'ngx-bootstrap/modal';
import { INRModule } from 'src/app/pipe/INR/INR.module';


export class AppModule { }

@NgModule({
  imports: [
    CommonModule,BankRoutingModule,SharedModule, ModalModule.forRoot(),INRModule
  ],
  declarations: [BankComponent]
})
export class BankModule { }
