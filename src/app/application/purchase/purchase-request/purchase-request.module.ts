import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PurchaseRequestComponent } from './purchase-request.component';
import { PurchaseRequestroutingModule } from './purchase-request-routing.module';
import { INRModule } from 'src/app/pipe/INR/INR.module';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgSelectModule } from '@ng-select/ng-select';
@NgModule({
  imports: [
    CommonModule,PurchaseRequestroutingModule,NgxDatatableModule,NgSelectModule,SharedModule,FormsModule,INRModule
  ],
  declarations: [PurchaseRequestComponent]
})
export class PurchaseRequestModule { }
