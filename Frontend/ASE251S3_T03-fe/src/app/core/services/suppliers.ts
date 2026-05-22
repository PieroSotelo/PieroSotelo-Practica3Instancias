import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

export interface Supplier {
  id?: number;
  commercial_name: string;
  phone: string;
  email: string;
  ubigeo_code: string;
  ruc: string;
  address: string;
  status: 'A' | 'I';
  created_date?: string;
  update_date?: string;
  deleted_date?: string | null;
  restored_date?: string | null;
}

interface BackendSupplier {
  id?: number;
  commercialName?: string;
  phone?: string;
  email?: string;
  ubigeoCode?: string;
  ruc?: string;
  address?: string;
  status?: string;
  createdDate?: string;
  updateDate?: string;
  deletedDate?: string | null;
  restoredDate?: string | null;
}

interface BackendSupplierListResponse {
  value?: BackendSupplier[];
  Count?: number;
}

@Injectable({
  providedIn: 'root',
})
export class SuppliersService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = 'http://localhost:8085/api/v1/supplier';

  getAllSuppliers(): Observable<Supplier[]> {
    return this.http.get<BackendSupplier[]>(this.baseUrl).pipe(
      map((suppliers) => {
        console.log('Backend raw data:', suppliers);
        const mapped = suppliers.map((supplier) => {
          const result = this.fromBackend(supplier);
          console.log(`Supplier ${result.id}: status=${result.status} (from backend: ${supplier.status})`);
          return result;
        });
        console.log('Mapped suppliers:', mapped);
        return mapped;
      })
    );
  }

  getSupplierById(id: number): Observable<Supplier> {
    return this.http
      .get<BackendSupplier>(`${this.baseUrl}/${id}`)
      .pipe(map((supplier) => this.fromBackend(supplier)));
  }

  createSupplier(data: Omit<Supplier, 'id'>): Observable<Supplier> {
    return this.http
      .post<BackendSupplier>(this.baseUrl, this.toBackend(data))
      .pipe(map((supplier) => this.fromBackend(supplier)));
  }

  updateSupplier(id: number, data: Omit<Supplier, 'id'>): Observable<Supplier> {
    console.log(`updateSupplier: id=${id}, data=`, data);
    console.log(`updateSupplier: sending status=${data.status}`);
    return this.http
      .put<BackendSupplier>(`${this.baseUrl}/${id}`, this.toBackend(data))
      .pipe(
        map((supplier) => {
          console.log(`updateSupplier response from backend:`, supplier);
          console.log(`updateSupplier response status from backend: '${supplier.status}'`);
          const result = this.fromBackend(supplier);
          console.log(`updateSupplier after mapping, status='${result.status}'`);
          return result;
        })
      );
  }

  softDeleteSupplier(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  private fromBackend(supplier: BackendSupplier): Supplier {
    const status = (supplier.status || 'A') as 'A' | 'I';
    console.log(`fromBackend: received status='${supplier.status}', returning status='${status}'`);
    return {
      id: supplier.id,
      commercial_name: supplier.commercialName || '',
      phone: supplier.phone || '',
      email: supplier.email || '',
      ubigeo_code: supplier.ubigeoCode || '',
      ruc: supplier.ruc || '',
      address: supplier.address || '',
      status: status,
      created_date: supplier.createdDate,
      update_date: supplier.updateDate,
      deleted_date: supplier.deletedDate,
      restored_date: supplier.restoredDate,
    };
  }

  private toBackend(supplier: Omit<Supplier, 'id'>): BackendSupplier {
    const payload = {
      commercialName: supplier.commercial_name,
      phone: supplier.phone,
      email: supplier.email,
      ubigeoCode: supplier.ubigeo_code,
      ruc: supplier.ruc,
      address: supplier.address,
      status: supplier.status,
    };
    console.log('toBackend: converting to backend format. Status:', supplier.status, '-> backend status:', payload.status);
    return payload;
  }
}
