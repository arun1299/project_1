

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Rent_ledgerComponent } from './rent_ledger.component';


const routes: Routes = [{ path: '', component: Rent_ledgerComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class Rent_ledger_routingModule {
}
