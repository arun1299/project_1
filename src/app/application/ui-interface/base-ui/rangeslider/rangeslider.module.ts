import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RangesliderRoutingModule } from './rangeslider-routing.module';
import { RangesliderComponent } from './rangeslider.component';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { SharedModule } from 'primeng/api';


@NgModule({
  declarations: [
    RangesliderComponent
  ],
  imports: [
    CommonModule,
    RangesliderRoutingModule,
    NgxSliderModule,
    SharedModule
  ]
})
export class RangesliderModule { }
