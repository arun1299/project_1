import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DcListComponent } from './dc-list.component';
import { DcListRoutingModule } from './dc-list-routing-module';
import { SharedModule } from 'src/app/shared/shared.module';
import { INRModule } from 'src/app/pipe/INR/INR.module';
import { DcViewComponent } from '../dc-view/dc-view.component';
import { FormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  imports: [
    CommonModule,DcListRoutingModule,SharedModule,INRModule,FormsModule,NgxDatatableModule,NgSelectModule
  ],
  declarations: [DcListComponent,DcViewComponent]
})
export class DcListModule { }
