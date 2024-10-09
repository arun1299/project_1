import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductComponent } from './product.component';
import { ProductRougtingModule } from './product-rougting.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select'
import { SharedModule } from 'src/app/shared/shared.module';
@NgModule({
  imports: [
    CommonModule,ProductRougtingModule,ReactiveFormsModule,NgSelectModule,SharedModule
  ],
  declarations: [ProductComponent]
})
export class ProductModule { }
