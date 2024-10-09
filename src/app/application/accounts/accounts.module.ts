import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountsComponent } from './accounts.component';
import { accountsRoutingModule } from './accounts-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
@NgModule({
  imports: [
    CommonModule,
    accountsRoutingModule,
    SharedModule
  ],
  declarations: [AccountsComponent]
})
export class AccountsModule { }
