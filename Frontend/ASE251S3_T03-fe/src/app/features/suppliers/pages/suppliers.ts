import { Component, OnInit } from '@angular/core';
import { SuppliersService } from '../services/suppliers.service';
import { Supplier } from '../interfaces/suppliers.interface';

@Component({
  selector: 'app-suppliers',
  templateUrl: './suppliers.html',
  styleUrls: ['./suppliers.css'],
  standalone: false
})
export class SuppliersComponent implements OnInit {
  suppliers: Supplier[] = [];
  editingSupplierId: number | null = null;
  isFormOpen: boolean = false;

  constructor(private suppliersService: SuppliersService) {}

  ngOnInit(): void {
    this.loadSuppliers();
  }

  loadSuppliers(): void {
    this.suppliersService.getAllSuppliers().subscribe({
      next: (data: Supplier[]) => {
        console.log('Proveedores cargados:', data);
        // Mostrar todos los proveedores (activos e inactivos)
        this.suppliers = data;
        console.log('Proveedores en la lista:', this.suppliers);
      },
      error: (err: any) => console.error('Error al cargar proveedores:', err)
    });
  }

  openForm(id?: number): void {
    this.editingSupplierId = id || null;
    this.isFormOpen = true;
  }

  closeForm(): void {
    this.isFormOpen = false;
    this.editingSupplierId = null;
  }

  onSupplierSaved(): void {
    this.loadSuppliers();
    this.closeForm();
  }

  deleteSupplier(id: number): void {
    if (confirm('¿Estas seguro de que deseas desactivar este proveedor?')) {
      this.suppliersService.softDeleteSupplier(id).subscribe({
        next: (result: any) => {
          console.log('Proveedor eliminado lógicamente:', result);
          this.loadSuppliers();
        },
        error: (err: any) => console.error('Error al desactivar proveedor:', err)
      });
    }
  }

  restoreSupplier(id: number): void {
    this.suppliersService.restoreSupplier(id).subscribe({
      next: (result: any) => {
        console.log('Proveedor restaurado:', result);
        this.loadSuppliers();
      },
      error: (err: any) => console.error('Error al restaurar proveedor:', err)
    });
  }
}