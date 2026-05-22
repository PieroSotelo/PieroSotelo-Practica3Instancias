import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, switchMap } from 'rxjs';
import { Producto } from '../interfaces/producto.interface';

interface BackendProducto {
  id?: number;
  category_id?: number;
  supplier_id?: number;
  name?: string;
  description?: string;
  media_unit?: string;
  unit_price?: number;
  expiration_date?: string;
  state?: string;
  created_date?: string;
  createdDate?: string;
  update_date?: string;
  updateDate?: string;
  deleted_date?: string | null;
  deletedDate?: string | null;
  restored_date?: string | null;
  restoredDate?: string | null;
}

interface BackendProductoListResponse {
  value?: BackendProducto[];
  Count?: number;
}

type ProductoAction = 'update' | 'delete' | 'restore';

@Injectable({ providedIn: 'root' })
export class ProductosService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = 'http://localhost:8080/api/product';

  getAllProductos(): Observable<Producto[]> {
    return this.http
      .get<BackendProducto[] | BackendProductoListResponse | BackendProducto>(this.baseUrl)
      .pipe(map((payload) => this.toList(payload).map((p) => this.fromBackend(p))));
  }

  findProductoById(id: number): Observable<Producto> {
    return this.http
      .get<BackendProducto>(`${this.baseUrl}/${id}`)
      .pipe(map((p) => this.fromBackend(p)));
  }

  createProducto(data: Omit<Producto, 'id' | 'created_date' | 'updated_date' | 'deleted_date' | 'restored_date'>): Observable<Producto> {
    const now = this.toBackendTimestamp();
    const payload = {
      ...this.toBackend(data),
      created_date: now,
      createdDate: now,
      update_date: null,
      updateDate: null,
      deleted_date: null,
      deletedDate: null,
      restored_date: null,
      restoredDate: null,
    };
    return this.http
      .post<BackendProducto>(`${this.baseUrl}/save`, payload)
      .pipe(map((p) => this.fromBackend(p)));
  }

  updateProducto(
    id: number,
    data: Omit<Producto, 'id' | 'created_date' | 'updated_date' | 'deleted_date' | 'restored_date'>,
    action: ProductoAction = 'update'
  ): Observable<Producto> {
    const now = this.toBackendTimestamp();
    const payload = {
      ...this.toBackend(data),
      update_date: now,
      updateDate: now,
      deleted_date: action === 'delete' ? now : null,
      deletedDate: action === 'delete' ? now : null,
      restored_date: action === 'restore' ? now : null,
      restoredDate: action === 'restore' ? now : null,
    };

    return this.http
      .put<BackendProducto>(`${this.baseUrl}/${id}`, payload)
      .pipe(
        catchError(() => this.http.put<BackendProducto>(`${this.baseUrl}/update/${id}`, payload)),
        map((p) => this.fromBackend(p))
      );
  }

  softDeleteProducto(id: number): Observable<Producto> {
    return this.http.patch<BackendProducto>(`${this.baseUrl}/delete/${id}`, {}).pipe(
      map((p) => this.fromBackend(p)),
      catchError(() =>
        this.findProductoById(id).pipe(
          switchMap((p) => this.updateProducto(id, this.toStatePayload(p, 'I'), 'delete'))
        )
      )
    );
  }

  restoreProducto(id: number): Observable<Producto> {
    return this.http.patch<BackendProducto>(`${this.baseUrl}/restore/${id}`, {}).pipe(
      map((p) => this.fromBackend(p)),
      catchError(() =>
        this.findProductoById(id).pipe(
          switchMap((p) => this.updateProducto(id, this.toStatePayload(p, 'A'), 'restore'))
        )
      )
    );
  }

  private fromBackend(p: BackendProducto): Producto {
    return {
      id: p.id ?? 0,
      category_id: p.category_id ?? 0,
      supplier_id: p.supplier_id ?? 0,
      name: p.name ?? '',
      description: p.description ?? '',
      media_unit: p.media_unit ?? '',
      unit_price: p.unit_price ?? 0,
      expiration_date: p.expiration_date ?? '',
      state: p.state ?? 'A',
      created_date: p.createdDate ?? p.created_date,
      updated_date: p.updateDate ?? p.update_date,
      deleted_date: p.deletedDate ?? p.deleted_date ?? null,
      restored_date: p.restoredDate ?? p.restored_date ?? null,
    };
  }

  private toBackend(p: Omit<Producto, 'id' | 'created_date' | 'updated_date' | 'deleted_date' | 'restored_date'>): BackendProducto {
    return {
      category_id: p.category_id,
      supplier_id: p.supplier_id,
      name: p.name,
      description: p.description,
      media_unit: p.media_unit,
      unit_price: p.unit_price,
      expiration_date: p.expiration_date,
      state: p.state,
    };
  }

  private toList(payload: BackendProducto[] | BackendProductoListResponse | BackendProducto): BackendProducto[] {
    if (Array.isArray(payload)) return payload;
    if ('value' in payload && Array.isArray(payload.value)) return payload.value;
    return [payload as BackendProducto];
  }

  private toBackendTimestamp(date = new Date()): string {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    const h = String(date.getHours()).padStart(2, '0');
    const min = String(date.getMinutes()).padStart(2, '0');
    const s = String(date.getSeconds()).padStart(2, '0');
    return `${y}-${m}-${d}T${h}:${min}:${s}`;
  }

  private toStatePayload(p: Producto, state: string): Omit<Producto, 'id' | 'created_date' | 'updated_date' | 'deleted_date' | 'restored_date'> {
    return {
      category_id: p.category_id,
      supplier_id: p.supplier_id,
      name: p.name,
      description: p.description,
      media_unit: p.media_unit,
      unit_price: p.unit_price,
      expiration_date: p.expiration_date,
      state,
    };
  }
}