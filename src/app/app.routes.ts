import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./login/login.page').then( m => m.LoginPage)
  },
  {
    path: 'usuario',
    loadComponent: () => import('./usuario/usuario.page').then( m => m.UsuarioPage)
  },
  {
    path: 'registrarusuario',
    loadComponent: () => import('./registrarusuario/registrarusuario.page').then( m => m.RegistrarusuarioPage)
  },
  {
    path: '**',
    redirectTo: 'login'
  },
];
