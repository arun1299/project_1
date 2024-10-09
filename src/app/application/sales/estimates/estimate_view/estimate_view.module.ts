/* eslint-disable @typescript-eslint/no-unused-vars */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { INRModule } from 'src/app/pipe/INR/INR.module';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  imports: [
    CommonModule,INRModule,NgxDatatableModule,MatAutocompleteModule,NgSelectModule
  ],
  declarations: []
})
export class Estimate_viewModule { }
