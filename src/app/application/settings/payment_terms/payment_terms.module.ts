import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Payment_termsComponent } from './payment_terms.component';
import { Payment_terms_routingModule } from './payment_terms_routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,Payment_terms_routingModule,SharedModule
  ],
  declarations: [Payment_termsComponent]
})
export class Payment_termsModule { }
