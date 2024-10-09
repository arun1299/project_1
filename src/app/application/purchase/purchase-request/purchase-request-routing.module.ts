import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PurchaseRequestComponent } from './purchase-request.component';

const routes: Routes = [
  {
    path: '',
    component:PurchaseRequestComponent
    ,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})


export class PurchaseRequestroutingModule {
}
