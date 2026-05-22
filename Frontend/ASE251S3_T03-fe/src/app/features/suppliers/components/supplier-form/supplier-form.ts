import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SuppliersService } from '../../services/suppliers.service';
import { Supplier } from '../../interfaces/suppliers.interface';

@Component({
  selector: 'app-supplier-form',
  templateUrl: './supplier-form.html',
  styleUrls: ['./supplier-form.css'],
  standalone: false
})
export class SupplierFormComponent implements OnInit, OnChanges {
  @Input() supplierId: number | null = null;
  @Output() onSave = new EventEmitter<void>();
  @Output() onCancel = new EventEmitter<void>();

  supplierForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private suppliersService: SuppliersService
  ) {
    this.initForm();
  }

  ngOnInit(): void {
    this.checkFormStatus();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['supplierId'] && this.supplierForm) {
      this.checkFormStatus();
    }
  }

  private initForm(): void {
    this.supplierForm = this.fb.group({
      commercial_name: ['', [Validators.required]],
      phone: ['', [Validators.required, Validators.maxLength(9)]],
      email: ['', [Validators.required, Validators.email]],
      ubigeo_code: ['', [Validators.required]],
      ruc: ['', [Validators.required, Validators.minLength(11), Validators.maxLength(11)]],
      address: ['', [Validators.required]],
      status: [{ value: 'A', disabled: true }, [Validators.required]]
    });
  }

  private checkFormStatus(): void {
    if (this.supplierId) {
      this.supplierForm.get('status')?.enable();
      this.suppliersService.findSupplierById(this.supplierId).subscribe({
        next: (supplier: Supplier) => {
          this.supplierForm.patchValue(supplier);
        },
        error: (err: any) => console.error('Error al cargar datos del proveedor:', err)
      });
    } else {
      this.supplierForm.reset({ status: 'A' });
      this.supplierForm.get('status')?.disable();
    }
  }

  isFieldInvalid(field: string): boolean {
    const control = this.supplierForm.get(field);
    return !!(control && control.invalid && (control.dirty || control.touched));
  }

  submitForm(): void {
    if (this.supplierForm.invalid) {
      this.supplierForm.markAllAsTouched();
      console.warn('Formulario inválido', this.supplierForm.errors);
      return;
    }

    const rawValues = this.supplierForm.getRawValue();
    console.log('Enviando datos:', rawValues);

    if (this.supplierId) {
      this.suppliersService.updateSupplier(this.supplierId, rawValues).subscribe({
        next: () => {
          console.log('Proveedor actualizado exitosamente');
          this.onSave.emit();
        },
        error: (err: any) => console.error('Error al actualizar proveedor:', err)
      });
    } else {
      this.suppliersService.createSupplier(rawValues).subscribe({
        next: () => {
          console.log('Proveedor guardado exitosamente');
          this.onSave.emit();
        },
        error: (err: any) => console.error('Error al guardar proveedor:', err)
      });
    }
  }

  cancel(): void {
    this.onCancel.emit();
  }
}