/* eslint-disable @typescript-eslint/no-unused-vars */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddDcComponent } from './add-dc.component';
import { AddDcRoutingModule } from './add-dc-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { MatAutocompleteModule } from '@angular/material/autocomplete'; // Import MatAutocompleteModule
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {AsyncPipe} from '@angular/common'
import { ReactiveFormsModule } from '@angular/forms';
@NgModule({
  declarations: [AddDcComponent],
  imports: [
    CommonModule,
     AddDcRoutingModule,
     SharedModule,
     NgSelectModule,
     MatAutocompleteModule,
     MatInputModule,
     ReactiveFormsModule,
     AsyncPipe,
     MatFormFieldModule
    ],
})
export class AddDcModule {}
