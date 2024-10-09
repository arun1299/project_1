import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddBlogsRoutingModule } from './add-blogs-routing.module';
import { AddBlogsComponent } from './add-blogs.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [AddBlogsComponent],
  imports: [CommonModule, AddBlogsRoutingModule, SharedModule],
})
export class AddBlogsModule {}
