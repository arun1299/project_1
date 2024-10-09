import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddPagesRoutingModule } from './add-pages-routing.module';
import { AddPagesComponent } from './add-pages.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    AddPagesComponent
  ],
  imports: [
    CommonModule,
    AddPagesRoutingModule,
    SharedModule
  ]
})
export class AddPagesModule { }
