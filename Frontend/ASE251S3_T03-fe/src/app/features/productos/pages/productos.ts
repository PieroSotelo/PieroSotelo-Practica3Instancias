//Importaciones de Angular
import { Component, OnInit } from '@angular/core';

//Importamos desde la ubicación de feature
import { ProductosService } from '../services/productos.service';
import { Producto } from '../interfaces/producto.interface';

@Component({
    selector : 'app-productos',
    templateUrl: './productos.html',
    styleUrls: ['./productos.css'],
    standalone: false, //Usamos NgModule no standalone
})
export class Productos implements OnInit {

    //Listar todos los productos cargados desde la API
    productos: Producto[] = [];

    //Guarda el ID del producto que se va a editar
    //null = formulario cerrado o en modo creación
    editingProductoId: number | null = null;

    //Inyectamos el servicio de productos
    constructor(private productosService: ProductosService) {}

    //Al iniciar el componente, cargamos los productos
    ngOnInit() {
        this.loadProductos();
    }

    //Llama a la API y llena el arreglo de productos
    loadProductos() {
        this.productosService.getAllProductos().subscribe((productos) => {
            this.productos = productos;
        });
    }

    //Abre el formulario para crear (sind id) o editar (con id)
    openForm(id?: number) {
        this.editingProductoId = id ?? null;
    }

    //Cierra el formulario y limpia el ID seleccionado
    closeForm() {
        this.editingProductoId = null;
    }

    //Se ejecuta cuando el formulario se guarda de manera exitosa
    //Recarga la lista y cierra el formulario
    onProductoSaved() {
        this.loadProductos();
        this.closeForm();
    }

    //Desactiva un producto (cambiar su estado a 'I')
    //No lo elimina, solo cambia su estado a inactivo
    deleteProducto(id: number) {
        if (confirm('¿Estas seguro de que deseas desactivar este producto?')) {
            this.productosService.softDeleteProducto(id).subscribe(() => {

                //Si el producto que  se eliminó era el que se estaba editando  se cerrara el formulario
                if (this.editingProductoId === id) {
                    this.closeForm();
                }
                this.loadProductos();
            });
        }
    }

    //Restaura un producto (cambiar su estado a'A')
    restoreProducto(id: number) {
        this.productosService.restoreProducto(id).subscribe(() => {
            this.loadProductos();
        });
    }
}
