import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddPageRoutingModule } from './add-page-routing.module';
import { AddPageComponent } from './add-page.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    AddPageComponent
  ],
  imports: [
    CommonModule,
    AddPageRoutingModule,
    SharedModule,
    ]
})
export class AddPageModule { }
