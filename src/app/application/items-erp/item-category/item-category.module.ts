import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemCategoryComponent } from './item-category.component';
import { ItemCategoryRoutingModule } from './item-category-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,ItemCategoryRoutingModule,SharedModule
  ],
  declarations: [ItemCategoryComponent]
})
export class ItemCategoryModule { }
