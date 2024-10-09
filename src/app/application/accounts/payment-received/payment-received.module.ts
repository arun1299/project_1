import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentReceivedComponent } from './payment-received.component';
import { PaymentReceivedRoutingModule } from './payment-received-routing.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { INRModule } from 'src/app/pipe/INR/INR.module';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { PaymentViewComponent } from './payment-view/payment-view.component';
import { NgSelectModule } from '@ng-select/ng-select';


@NgModule({
  imports: [
    CommonModule,PaymentReceivedRoutingModule,NgxDatatableModule,INRModule,FormsModule,SharedModule,NgSelectModule
  ],
  declarations: [PaymentReceivedComponent,PaymentViewComponent]
})
export class PaymentReceivedModule { }
