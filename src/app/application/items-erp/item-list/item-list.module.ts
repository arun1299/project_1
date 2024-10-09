import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemListComponent } from './item-list.component';
import { ItemListRoutingModule } from './item-list-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { INRModule } from 'src/app/pipe/INR/INR.module';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  imports: [
    CommonModule,ItemListRoutingModule,SharedModule,INRModule,NgSelectModule
  ],
  declarations: [ItemListComponent]
})
export class ItemListModule { }
