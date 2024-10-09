import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Inventory_reportComponent } from './inventory_report.component';


const routes: Routes = [
  {
    path: '',
    component: Inventory_reportComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InventoryReportRoutingModule {
}
