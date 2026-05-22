import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Supplier } from '../../interfaces/suppliers.interface';

@Component({
  selector: 'app-supplier-list',
  templateUrl: './supplier-list.html',
  styleUrls: ['./supplier-list.css'],
  standalone: false
})
export class SupplierListComponent {
  @Input() suppliers: Supplier[] = [];
  @Output() onEdit = new EventEmitter<number>();
  @Output() onDelete = new EventEmitter<number>();
  @Output() onRestore = new EventEmitter<number>();

  edit(id: number): void {
    this.onEdit.emit(id);
  }

  delete(id: number): void {
    this.onDelete.emit(id);
  }

  restore(id: number): void {
    this.onRestore.emit(id);
  }
}