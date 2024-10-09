import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Add_estimatesComponent } from './add_estimates.component';
import { Add_Estimates_routingModule } from './add_estimates_routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { MatAutocompleteModule } from '@angular/material/autocomplete'; // Import MatAutocompleteModule
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {AsyncPipe} from '@angular/common'
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    Add_Estimates_routingModule,
    SharedModule,
    NgSelectModule,
    MatAutocompleteModule,
    MatInputModule,
    ReactiveFormsModule,
    AsyncPipe,
    MatFormFieldModule
  ],
  declarations: [Add_estimatesComponent]
})
export class Add_estimatesModule { }
