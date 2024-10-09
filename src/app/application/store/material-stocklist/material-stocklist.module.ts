import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialStocklistComponent } from './material-stocklist.component';
import { MaterialStocklistRoutingModule } from './material-stocklist-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { INRModule } from 'src/app/pipe/INR/INR.module';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

@NgModule({
  imports: [
    CommonModule,
    MaterialStocklistRoutingModule,
    SharedModule,
    INRModule,
    MatAutocompleteModule
  ],
  declarations: [MaterialStocklistComponent]
})
export class MaterialStocklistModule { }
