import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../core/core.index';
import { LoggedInGuard } from '../core/guards/loggedIn/logged-in.guard';
import { ApplicationComponent } from './application.component';

const routes: Routes = [
  {
    path: '',
    component: ApplicationComponent,
     canActivate: [AuthGuard],
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
      },

      {path:'accounts',loadChildren:() => import('./accounts/accounts.module').then((m) => m.AccountsModule)},
      {path:'hr',loadChildren:() => import('./hr/hr.module').then((m) => m.HrModule)},
      {path:'items',loadChildren:() => import('./items-erp/items-erp.module').then((m) => m.ItemsErpModule)},
      {path:'sales',loadChildren:() => import('./sales/sales.module').then((m) => m.SalesModule)},
      {path:'purchase',loadChildren:() => import('./purchase/purchase.module').then((m) => m.PurchaseModule)},
      {path:'project',loadChildren:() => import('./project/project.module').then((m) => m.ProjectModule)},
      {path:'store',loadChildren:() => import('./store/store.module').then((m) => m.StoreModule)},
      {path:'report',loadChildren:() => import('./report/report.module').then((m) => m.ReportModule)},
      {path:'settings_erp',loadChildren:() => import('./settings/settings.module').then((m) => m.SettingsModule)},
      {path:'rent_ledger',loadChildren:() => import('./rent_ledger/rent_ledger.module').then((m) => m.Rent_ledgerModule)},
      {path:'loan_tran',loadChildren:() => import('./load_transactions/load_transactions.module').then((m) => m.Load_transactionsModule)},
      {path:'product',loadChildren:() => import('./project/product/product.module').then((m) => m.ProductModule)},
      {
        path: 'base-ui',
        loadChildren: () =>
          import('./ui-interface/base-ui/base-ui.module').then(
            (m) => m.BaseUIModule
          ),
      },
      {
        path: 'elements',
        loadChildren: () =>
          import('./ui-interface/elements/elements.module').then(
            (m) => m.ElementsModule
          ),
      },
      {
        path: 'tables',
        loadChildren: () =>
          import('./ui-interface/tables/tables.module').then(
            (m) => m.TablesModule
          ),
      },
      {
        path: 'icon',
        loadChildren: () =>
          import('./ui-interface/icon/icon.module').then((m) => m.IconModule),
      },
      {
        path: 'forms',
        loadChildren: () =>
          import('./ui-interface/forms/forms.module').then(
            (m) => m.FormsModule
          ),
      },
      {
        path: 'chart',
        loadChildren: () =>
          import('./ui-interface/charts/charts.module').then(
            (m) => m.ChartsModule
          ),
      },
      {
        path: 'blank-page',
        loadChildren: () =>
          import('./blank-page/blank-page.module').then(
            (m) => m.BlankPageModule
          ),
      },

      {
        path: 'profile',
        loadChildren: () =>
          import('./profile/profile.module').then((m) => m.ProfileModule),
      },



      {
        path: 'blog',
        loadChildren: () =>
          import('./blog/blog.module').then((m) => m.BlogModule),
      },

      {
        path: 'sales',
        loadChildren: () =>
          import('./sales/sales.module').then((m) => m.SalesModule),
      },

      {
        path: 'pages',
        loadChildren: () =>
          import('./pages/pages.module').then((m) => m.PagesModule),
      },
    ],
  },
  {
    path: '',
    canActivate: [LoggedInGuard],
    loadChildren: () =>
      import('./authentication/authentication.module').then(
        (m) => m.AuthenticationModule
      ),
  },
  {
    path: 'error',
    loadChildren: () =>
      import('../shared/error/error.module').then((m) => m.ErrorModule),
  },

  {
    path: '**',
    redirectTo: 'error/404',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FeatureModuleRoutingModule {}
