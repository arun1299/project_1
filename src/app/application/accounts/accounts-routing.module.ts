import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountsComponent } from './accounts.component';

const routes: Routes = [
  {
    path: '',
    component: AccountsComponent,
    children: [
      {
        path: 'bank',
        loadChildren: () =>  import('./bank/bank.module').then((m) => m.BankModule ),
      },
      {
        path:'transaction',
        loadChildren:() => import('./transaction/transaction.module').then((m) => m.TransactionModule),
      },
      {
        path :'expense',
        loadChildren:() => import('./expense/expense.module').then((m) => m.ExpenseModule)
      },
      {
        path:'paymentmade',
        loadChildren:() => import('./payment-made/payment-made.module').then((m) => m.PaymentMadeModule)
      },

      {
        path:'payment_received',
        loadChildren:() => import('./payment-received/payment-received.module').then((m) => m.PaymentReceivedModule)
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class accountsRoutingModule {}
