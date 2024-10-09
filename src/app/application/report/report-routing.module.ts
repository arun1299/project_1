
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReportComponent } from './report.component';

const routes: Routes = [
  {
    path: '',
    component: ReportComponent,
    children: [
      {
        path: 'sales_by_customer',
        loadChildren: () =>  import('./sales_by_customer/sales_by_customer.module').then((m) => m.Sales_by_customerModule ),
      },
      {
        path: 'invoice_report',
        loadChildren: () =>  import('./invoice_report/invoice_report.module').then((m) => m.Invoice_reportModule ),
      },
      {
        path: 'dc_report',
        loadChildren: () =>  import('./dc_report/dc_report.module').then((m) => m.Dc_reportModule),
      },
      {
        path: 'inventory_summary',
        loadChildren: () =>  import('./inventory_report/inventory_report.module').then((m) => m.Inventory_reportModule),
      },

      {
        path: 'customer_balance',
        loadChildren: () =>  import('./customer_balance_report/customer_balance_report.module').then((m) => m.Customer_balance_reportModule),
      },

      {
        path: 'payment_received',
        loadChildren: () =>  import('./payment_received_report/payment_received_report.module').then((m) => m.Payment_received_reportModule),
      },

      {
        path: 'vendor_balance',
        loadChildren: () =>  import('./vendor_balance_report/vendor_balance_report.module').then((m) => m.Vendor_balance_reportModule),
      },

      {
        path: 'payment_made',
        loadChildren: () =>  import('./payment_made_report/payment_made_report.module').then((m) => m.Payment_made_reportModule),
      },

      {
        path: 'bill_report',
        loadChildren: () =>  import('./bill_report/bill_report.module').then((m) => m.Bill_reportModule),
      },
      {
        path: 'po_details',
        loadChildren: () =>  import('./po_report/po_report.module').then((m) => m.Po_reportModule),
      },
      {
        path: 'gst_report',
        loadChildren: () =>  import('./gst_report/gst_report.module').then((m) => m.Gst_reportModule),
      },
      {
        path: 'tds_tcs',
        loadChildren: () =>  import('./tcs_tds_report/tcs_tds_report.module').then((m) => m.Tcs_tds_reportModule),
      },
      {
        path: 'epf_report',
        loadChildren: () =>  import('./epf_report/epf_report.module').then((m) => m.Epf_reportModule),
      },
      {
        path: 'esi_report',
        loadChildren: () =>  import('./esi_report/esi_report.module').then((m) => m.Esi_reportModule),
      },
      {
        path: 'attendance',
        loadChildren: () =>  import('./attendance_report/attendance_report.module').then((m) => m.Attendance_reportModule),
      },
      {
        path: 'expense_report',
        loadChildren: () =>  import('./expense_report/expense_report.module').then((m) => m.Expense_reportModule),
      },
      {
        path: 'emp_account',
        loadChildren: () =>  import('./employee_account_report/employee_account_report.module').then((m) => m.Employee_account_reportModule),
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReportRoutingModule {
}
