import { NgSelectModule } from '@ng-select/ng-select';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentMadeComponent } from './payment-made.component';
import { PaymentMadeRoutingModule } from './payment-made-routing.module';
import { INRModule } from 'src/app/pipe/INR/INR.module';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { PaymentViewComponent } from './payment-view/payment-view.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

@NgModule({
    declarations: [PaymentMadeComponent,PaymentViewComponent],
    imports: [
        CommonModule, PaymentMadeRoutingModule, INRModule,FormsModule,SharedModule,NgxDatatableModule,NgSelectModule
    ]
})
export class PaymentMadeModule { }
