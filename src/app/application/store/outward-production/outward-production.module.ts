import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OutwardProductionComponent } from './outward-production.component';
import { OutwardProductionRoutingModule } from './outward-production-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { INRModule } from 'src/app/pipe/INR/INR.module';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgSelectModule } from '@ng-select/ng-select';
@NgModule({
  imports: [
    CommonModule,
    OutwardProductionRoutingModule,
    SharedModule,
    INRModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    NgxDatatableModule,
    NgSelectModule
  ],
  declarations: [OutwardProductionComponent]
})
export class OutwardProductionModule { }
