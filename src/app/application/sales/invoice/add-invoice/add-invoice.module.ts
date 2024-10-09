/* eslint-disable @typescript-eslint/no-unused-vars */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddInvoiceComponent } from './add-invoice.component';
import { AddInvoiceRoutingModule } from './add-invoice-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { MatAutocompleteModule } from '@angular/material/autocomplete'; // Import MatAutocompleteModule
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {AsyncPipe} from '@angular/common'
import { ReactiveFormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  declarations: [AddInvoiceComponent],
  imports: [
    CommonModule,
     AddInvoiceRoutingModule,
     SharedModule,
     NgSelectModule,
     MatAutocompleteModule,
     MatInputModule,
     ReactiveFormsModule,
     AsyncPipe,
     MatFormFieldModule,
     MatTooltipModule
    ],
})
export class AddInvoiceModule {}
