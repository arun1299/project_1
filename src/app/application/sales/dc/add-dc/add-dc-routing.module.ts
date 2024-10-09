import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddDcComponent } from './add-dc.component';

const routes: Routes = [
	{
		path : '',
		component : AddDcComponent
	}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddDcRoutingModule { }
