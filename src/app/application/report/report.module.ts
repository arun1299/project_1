import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportComponent } from './report.component';
import { ReportRoutingModule } from './report-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CustomPaginationModule } from "../../shared/custom-pagination/custom-pagination.module";
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
    declarations: [ReportComponent],
    imports: [
        CommonModule, ReportRoutingModule, ReactiveFormsModule,SharedModule,
        CustomPaginationModule
    ]
})
export class ReportModule { }
