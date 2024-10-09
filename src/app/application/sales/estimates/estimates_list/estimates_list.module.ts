import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Estimates_listComponent } from './estimates_list.component';
import { Estimates_list_routingModule } from './estimates_list_routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { INRModule } from 'src/app/pipe/INR/INR.module';
import { Estimate_viewComponent } from '../estimate_view/estimate_view.component';
import { FormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  imports: [
    CommonModule,Estimates_list_routingModule,SharedModule,INRModule,FormsModule,NgxDatatableModule,NgSelectModule
  ],
  declarations: [Estimates_listComponent,Estimate_viewComponent]
})
export class Estimates_listModule { }
