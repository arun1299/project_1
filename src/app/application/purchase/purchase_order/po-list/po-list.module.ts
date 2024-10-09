import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PoListComponent } from './po-list.component';
import { PoListRoutingmodule } from './po-list-routing.module';
import { INRModule } from 'src/app/pipe/INR/INR.module';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { PoViewComponent } from '../po-view/po-view.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgSelectModule } from '@ng-select/ng-select';
@NgModule({
  imports: [
    CommonModule,PoListRoutingmodule,INRModule,FormsModule,SharedModule,NgxDatatableModule,NgSelectModule
  ],
  declarations: [PoListComponent,PoViewComponent]
})
export class PoListModule { }
