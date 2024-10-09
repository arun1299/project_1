import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules  } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login',
  },
  {
    path: '',loadChildren: () => import('./application/application.module').then((m) => m.FeatureModuleModule),
  },


];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    useHash: true,
   // preloadingStrategy: PreloadAllModules, // <- comment this line for activate lazy load
  })
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
