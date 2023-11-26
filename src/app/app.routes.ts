import { Routes } from '@angular/router';
import { canActivateUsuario } from './services/guards/new-guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./login/login.page').then(m => m.LoginPage)
  },
  {
    path: 'usuario',
    loadComponent: () => import('./usuario/usuario.page').then(m => m.UsuarioPage)
    //, canActivate: [canActivateUsuario]
  },
  {
    path: 'registrarusuario',
    loadComponent: () => import('./registrarusuario/registrarusuario.page').then(m => m.RegistrarusuarioPage)
  },
  {
    path: 'pasajero',
    loadComponent: () => import('./pasajero/pasajero.page').then(m => m.PasajeroPage)
  },
  {
    path: 'restablecercontrasena',
    loadComponent: () => import('./restablecercontrasena/restablecercontrasena.page').then( m => m.RestablecercontrasenaPage)
  },
  {
    path: 'viajes',
    loadComponent: () => import('./viajes/viajes.page').then( m => m.ViajesPage)
  },
  {
    path: 'viaje',
    loadComponent: () => import('./viaje/viaje.page').then( m => m.ViajePage)
  },
  {
    path: '**',
    redirectTo: 'login'
  },
];
