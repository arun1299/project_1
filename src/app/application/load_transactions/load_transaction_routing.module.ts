
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Load_transactionsComponent } from './load_transactions.component';



const routes: Routes = [{ path: '', component: Load_transactionsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})


export class Load_transaction_routingModule {
}
