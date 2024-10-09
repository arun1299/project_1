import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddCategoriesRoutingModule } from './add-categories-routing.module';
import { AddCategoriesComponent } from './add-categories.component';


@NgModule({
  declarations: [
    AddCategoriesComponent
  ],
  imports: [
    CommonModule,
    AddCategoriesRoutingModule
  ]
})
export class AddCategoriesModule { }
