import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Producto } from '../../interfaces/producto.interface';

@Component({
    selector: 'app-producto-list',
    templateUrl: './producto-list.html',
    styleUrls: ['./producto-list.css'],
    standalone: false, 
})

export class ProductoList {

    //Lista de productos que recibe desde productos.ts
    @Input() productos: Producto[] = [];

    //Controla si se muestra el botón de restaurar (por defecto oculto)
    @Input() showRestore = false;

    //Mensaje que se miestra cuando no hay productos en la lista
    @Input() emptyMessage = 'No hay productos registrados.';

    //Emite el ID del producto cuando el usuario hace click en Editar
    @Output() onEdit = new EventEmitter<number>();

    //Emite el ID del producto cuando el usuario hace click en Eliminar
    @Output() onDelete = new EventEmitter<number>();

    //Emite el ID del producto cuando el usuario hace click en Reactivar
    @Output() onRestore = new EventEmitter<number>();

    //Mandar el evento de edición hacia productos.ts
    editProducto(id: number) {
        this.onEdit.emit(id);
    }

    //Mandar el evento de eliminación hacia productos.ts
    deleteProducto(id: number) {
        this.onDelete.emit(id);
    }

    //Mandar el evento de restauración hacia productos.ts
    restoreProducto(id: number) {
        this.onRestore.emit(id);
    }

    getActionLabel(producto: Producto): string {
        if (producto.deleted_date) return 'Eliminado';
        if (producto.updated_date) return 'Editado';
        return 'Creado';
    }

    getActionDate(producto: Producto): string | null {
        return producto.deleted_date ?? producto.updated_date ?? producto.created_date ?? null;
    }
}
