import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { INRModule } from 'src/app/pipe/INR/INR.module';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { NgSelectModule } from '@ng-select/ng-select';
@NgModule({
  imports: [
    CommonModule,NgxDatatableModule,INRModule,MatAutocompleteModule,NgSelectModule
  ],
  declarations: []
})
export class DcViewModule { }
