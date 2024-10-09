import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InwardComponent } from './inward.component';
import { InwardRoutingModule } from './inward-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { INRModule } from 'src/app/pipe/INR/INR.module';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

@NgModule({
  imports: [
    CommonModule,InwardRoutingModule,SharedModule,INRModule,MatAutocompleteModule
  ],
  declarations: [InwardComponent]
})
export class InwardModule { }
