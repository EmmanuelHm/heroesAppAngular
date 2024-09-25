import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Error404PageComponent } from './shared/pages/error404-page/error404-page.component';

const routes: Routes = [

  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule), //lazyLoading
  },

  {
    path: 'heroes',
    loadChildren: () => import('./heroes/heroes.module').then(m => m.HeroesModule), //lazyLoading
  },

  {
    path: '404',
    component: Error404PageComponent
  },

  // Ruta por defecto 
  {
    path: '',
    redirectTo: 'heroes',
    pathMatch: 'full'
  },

  // Ruta de error por enlace no conocido
  {
    path: '**',
    redirectTo: '404'
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
