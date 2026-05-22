import { Component, Input, OnChanges, OnInit, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ProductosService } from '../../services/productos.service';
import { Producto } from '../../interfaces/producto.interface';

@Component({
    selector: 'app-producto-form',
    templateUrl: './producto-form.html',
    styleUrls: ['./producto-form.css'],
    standalone: false,

})
export class ProductoForm implements OnInit, OnChanges {

    //Recibe el ID del producto a editar. null = modo creación
    @Input() productoId: number | null = null;

    //Emite cuando el formulario se guarda de manera exitosa
    @Output() onSave = new EventEmitter<void>();

    //Emite cuando el usuario cancela
    @Output() onCancel = new EventEmitter<void>();

    form: FormGroup;

    //MOdo edición o creación
    isEdit = false;

    constructor(
        private formBuilder: FormBuilder,
        private productosService: ProductosService

    ) {

        //Definición del formulario reactivo con validaciones
        this.form = this.formBuilder.group({
            category_id: [0, [Validators.required, Validators.min(1)]],
            supplier_id: [0, [Validators.required, Validators.min(1)]],
            name: ['', [Validators.required, Validators.minLength(3)]],
            description: ['', [Validators.required, Validators.minLength(10)]],
            media_unit: ['', [Validators.required, Validators.minLength(1)]],
            unit_price: [0, [Validators.required, Validators.min(0)]],
            expiration_date: ['', Validators.required],
            state: ['A', Validators.required],
        });
    }

    //Al iniciar el componente cargamos el producto
    ngOnInit() {
        this.loadProductoInForm();
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes['productoId']) {
            this.loadProductoInForm();
        }
    }

    private loadProductoInForm() {

        //Modo creación
        if (!this.productoId) {
            this.isEdit = false;
            this.form.reset({
                category_id: 0,
                supplier_id: 0,
                name: '',
                description: '',
                media_unit: '',
                unit_price: 0,
                expiration_date: '',
                state: 'A',
            });

            //Deshabilitar el campo de estado para que no pueda cambiarse al crear
            this.form.get('state')?.disable();
            return;
        }

        //Modo edición
        this.isEdit = true;

        //En edición sí se puede cambiar el estado, así que habilitamos el campo por si estaba deshabilitado en una edición anterior
        this.form.get('state')?.enable();

        this.productosService.findProductoById(this.productoId).subscribe((producto) => {
            this.form.patchValue(producto);
        });
    }

    submit() {
        if (this.form.invalid) return;

        const formValue = this.form.getRawValue();

        if (this.isEdit && this.productoId) {
            //Actualizar producto existente
        this.productosService.updateProducto(this.productoId, formValue).subscribe(() => {
            this.onSave.emit();
        });
        } else {
            //Crear nuevo producto
            this.productosService.createProducto(formValue).subscribe(() => {
                this.onSave.emit();
            });
        }
    }

    //Cancelar y notificar al productos.ts
    cancel() {
        this.onCancel.emit();
    }
}



