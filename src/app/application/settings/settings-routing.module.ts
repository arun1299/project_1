import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SettingsComponent } from './settings.component';


const routes: Routes = [
  {
    path: '',
    component: SettingsComponent,
    children: [
      {
        path: 'profile',
        loadChildren: () =>  import('./organisation_profile/organisation_profile.module').then((m) => m.Organisation_profileModule ),
      },
      {
        path: 'tax',
        loadChildren: () =>  import('./tax/tax.module').then((m) => m.TaxModule ),
      },
      {
        path: 'unit',
        loadChildren: () =>  import('./unit/unit.module').then((m) => m.UnitModule ),
      },
      {
        path: 'prefix',
        loadChildren: () =>  import('./prifix_setting/prifix_setting.module').then((m) => m.Prifix_settingModule),
      },
      {
        path: 'menu_setting',
        loadChildren: () =>  import('./menu_setting/menu_setting.module').then((m) => m.Menu_settingModule),
      },
      {
        path: 'payment_term',
        loadChildren: () =>  import('./payment_terms/payment_terms.module').then((m) => m.Payment_termsModule),
      },
      {
        path: 'pay_roll',
        loadChildren: () =>  import('./pay_roll/pay_roll.module').then((m) => m.Pay_rollModule),
      },
      {
        path: 'branch',
        loadChildren: () =>  import('./branch/branch.module').then((m) => m.BranchModule),
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})


export class SettingsErpRoutingModule {
}
