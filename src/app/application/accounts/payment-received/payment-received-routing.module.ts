import { NgModule } from "@angular/core";
import { RouterModule ,Routes} from "@angular/router";
import { PaymentReceivedComponent } from "./payment-received.component";

const routes: Routes = [
  {
    path: '',
    component:PaymentReceivedComponent
    ,
  },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})




export class PaymentReceivedRoutingModule {
}
