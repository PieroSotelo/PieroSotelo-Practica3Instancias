import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Página de inicio
import { Home } from './shared/pages/home/home';

// Feature Productos
import { Productos } from './features/productos/pages/productos';

// Feature Suppliers ——> ¡IMPORTADO! 🚀
import { SuppliersComponent } from './features/suppliers/pages/suppliers';

// Definición de rutas
const routes: Routes = [
  // Ruta raíz redirige a Home por defecto
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },

  // Home
  {
    path: 'home',
    component: Home,
  },

  // Productos
  {
    path: 'productos',
    component: Productos,
  },

  // Suppliers ——> ¡RUTA ACTIVA! 🚀
  {
    path: 'suppliers',
    component: SuppliersComponent,
  },

  // Rutas no encontradas redirigen al Home
  {
    path: '**',
    redirectTo: 'home',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }