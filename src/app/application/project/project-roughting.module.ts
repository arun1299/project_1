import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectComponent } from './project.component';

const routes: Routes = [
  {
    path: '',
    component: ProjectComponent,
    children: [
      {
        path: 'projects',
        loadChildren: () =>  import('./projects/projects.module').then((m) => m.ProjectsModule ),
      },
      {
        path: 'product',
        loadChildren: () =>  import('./product/product.module').then((m) => m.ProductModule ),
      },

    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class ProjectRoughtingModule {
}
