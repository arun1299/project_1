import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectComponent } from './project.component';
import { ProjectRoughtingModule } from './project-roughting.module';

@NgModule({
  imports: [
    CommonModule,ProjectRoughtingModule
  ],
  declarations: [ProjectComponent]
})
export class ProjectModule { }
