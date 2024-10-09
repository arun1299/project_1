import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { INRModule } from 'src/app/pipe/INR/INR.module';

@NgModule({
  declarations: [DashboardComponent,],
  imports: [CommonModule, DashboardRoutingModule, SharedModule,INRModule],
})
export class DashboardModule {}
