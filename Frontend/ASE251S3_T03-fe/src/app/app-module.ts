import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing-module';

// Componente raíz y página de inicio
import { App } from './app';
import { Home } from './shared/pages/home/home';

// Componentes compartidos
import { Header } from './shared/components/header/header';
import { CrudLayout } from './shared/components/crud-layout/crud-layout';

// Feature productos
import { Productos } from './features/productos/pages/productos';
import { ProductoList } from './features/productos/components/producto-list/producto-list';
import { ProductoForm } from './features/productos/components/producto-form/producto-form';

// Feature Suppliers ——> ¡ACTIVADO CON LOS NOMBRES EXACTOS DE TUS CLASES! 🚀
import { SuppliersComponent } from './features/suppliers/pages/suppliers';
import { SupplierListComponent } from './features/suppliers/components/supplier-list/supplier-list';
import { SupplierFormComponent } from './features/suppliers/components/supplier-form/supplier-form';

// Feature Personas
import { PersonasComponent } from './features/personas/pages/personas';
import { PersonForm } from './features/personas/components/person-form/person-form';
import { PersonList } from './features/personas/components/person-list/person-list';

@NgModule({
  declarations: [
    // Base
    App,
    Home,

    // Shared
    Header,
    CrudLayout,

    // Productos
    Productos,
    ProductoList,
    ProductoForm,

    // Suppliers ——> ¡DESCOMENTADO Y ACTIVO! 🚀
    SuppliersComponent,
    SupplierListComponent,
    SupplierFormComponent,

    // Personas
    PersonasComponent,
    PersonForm,
    PersonList,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [
    provideBrowserGlobalErrorListeners()
  ],
  bootstrap: [App],
})
export class AppModule { }