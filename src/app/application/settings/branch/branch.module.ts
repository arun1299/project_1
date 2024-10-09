import { ReactiveFormsModule } from '@angular/forms';
import { Branch_routingModule } from './branch_routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BranchComponent } from './branch.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  imports: [
    CommonModule,Branch_routingModule,ReactiveFormsModule,SharedModule,NgSelectModule
  ],
  declarations: [BranchComponent]
})
export class BranchModule { }
