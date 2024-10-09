import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaxComponent } from './tax.component';
import { Tax_routingModule } from './tax_routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { INRModule } from 'src/app/pipe/INR/INR.module';

@NgModule({
  imports: [
    CommonModule,Tax_routingModule,SharedModule,INRModule
  ],
  declarations: [TaxComponent]
})
export class TaxModule { }
