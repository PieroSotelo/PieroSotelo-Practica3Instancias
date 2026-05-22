import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, switchMap, catchError, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Supplier } from '../interfaces/suppliers.interface';

interface BackendSupplier {
  id: number;
  commercial_name: string;
  phone: string;
  email: string;
  ubigeo_code: string;
  ruc: string;
  address: string;
  status: string;
  created_date?: string;
  update_date?: string | null;
  deleted_date?: string | null;
  restored_date?: string | null;
}

interface BackendSupplierListResponse {
  value?: BackendSupplier[];
}

@Injectable({
  providedIn: 'root'
})
export class SuppliersService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'http://localhost:8080/api/v1/supplier';

  getAllSuppliers(): Observable<Supplier[]> {
    // Cambiar a /all cuando el backend esté configurado para devolver todos
    return this.http.get<any>(`${this.apiUrl}/all`).pipe(
      map(response => {
        console.log('Respuesta del backend (todos):', response);
        return this.toList(response);
      }),
      // Si falla, intenta con el endpoint antiguo (solo activos)
      catchError(() => {
        console.warn('Endpoint /all no disponible, usando endpoint estándar');
        return this.http.get<any>(this.apiUrl).pipe(
          map(response => this.toList(response))
        );
      })
    );
  }

  findSupplierById(id: number): Observable<Supplier> {
    return this.http.get<BackendSupplier>(`${this.apiUrl}/${id}`).pipe(
      map(backendData => this.fromBackend(backendData))
    );
  }

  createSupplier(data: Omit<Supplier, 'id'>): Observable<Supplier> {
    const payload = this.toBackend(data as Supplier);
    console.log('POST /api/v1/supplier con:', payload);
    return this.http.post<BackendSupplier>(this.apiUrl, payload).pipe(
      map(backendData => this.fromBackend(backendData))
    );
  }

  updateSupplier(id: number, data: Partial<Supplier>): Observable<Supplier> {
    console.log(`updateSupplier called con id=${id}, data:`, data);
    
    // Si está cambiando el status a 'I' (inactivo), usar el endpoint de delete
    if (data.status === 'I') {
      console.log(`Status es 'I', usando endpoint PATCH DELETE`);
      return this.http.patch<BackendSupplier>(`${this.apiUrl}/delete/${id}`, {}).pipe(
        map(backendData => {
          console.log('Respuesta del delete:', backendData);
          return this.fromBackend(backendData);
        })
      );
    }
    
    // Si está cambiando de 'I' a 'A' (restaurar), usar el endpoint de restore
    if (data.status === 'A') {
      console.log(`Status es 'A', verificando si necesita restore...`);
      // Obtener el supplier actual para ver su status anterior
      return this.findSupplierById(id).pipe(
        switchMap(current => {
          if (current.status === 'I') {
            console.log(`Status actual es 'I', usando endpoint PATCH RESTORE`);
            return this.http.patch<BackendSupplier>(`${this.apiUrl}/restore/${id}`, {});
          } else {
            // Status es 'A', hacer update normal
            console.log(`Status actual es 'A', haciendo UPDATE normal`);
            const payload = this.toBackend(data as Supplier);
            return this.http.put<BackendSupplier>(`${this.apiUrl}/${id}`, payload);
          }
        }),
        map(backendData => {
          console.log('Respuesta del update:', backendData);
          return this.fromBackend(backendData);
        })
      );
    }
    
    // Update normal para otros cambios
    const payload = this.toBackend(data as Supplier);
    console.log(`PUT /api/v1/supplier/${id} con:`, payload);
    return this.http.put<BackendSupplier>(`${this.apiUrl}/${id}`, payload).pipe(
      map(backendData => {
        console.log('Respuesta del update:', backendData);
        return this.fromBackend(backendData);
      })
    );
  }

  softDeleteSupplier(id: number): Observable<Supplier> {
    console.log(`PATCH /api/v1/supplier/delete/${id}`);
    return this.http.patch<BackendSupplier>(`${this.apiUrl}/delete/${id}`, {}).pipe(
      map(backendData => this.fromBackend(backendData))
    );
  }

  restoreSupplier(id: number): Observable<Supplier> {
    console.log(`PATCH /api/v1/supplier/restore/${id}`);
    return this.http.patch<BackendSupplier>(`${this.apiUrl}/restore/${id}`, {}).pipe(
      map(backendData => this.fromBackend(backendData))
    );
  }

  // --- Mapeadores Privados ---

  private fromBackend(s: any): Supplier {
    // Debug: mostrar lo que recibe del backend
    console.log('Backend supplier data:', s);
    
    return {
      id: s.id || s.Id || 0,
      commercial_name: s.commercialName || s.commercial_name || s.name || 'N/A',
      phone: s.phone || s.Phone || '',
      email: s.email || s.Email || '',
      ubigeo_code: s.ubigeoCode || s.ubigeo_code || s.ubigeo || '',
      ruc: s.ruc || s.Ruc || '',
      address: s.address || s.Address || s.direccion || '',
      status: s.status || s.Status || s.state || 'A',
      created_date: s.createdDate || s.created_date,
      update_date: s.updateDate || s.update_date,
      deleted_date: s.deletedDate || s.deleted_date,
      restored_date: s.restoredDate || s.restored_date
    };
  }

  private toBackend(s: Supplier): any {
    const payload = {
      commercialName: s.commercial_name,
      phone: s.phone,
      email: s.email,
      ubigeoCode: s.ubigeo_code,
      ruc: s.ruc,
      address: s.address,
      status: s.status
    };
    console.log('Datos enviados al backend (camelCase):', payload);
    return payload;
  }

  private toList(payload: any): Supplier[] {
    if (!payload) return [];
    
    // Si es un array directo
    if (Array.isArray(payload)) {
      return payload.map((item: BackendSupplier) => this.fromBackend(item));
    }
    
    // Si tiene propiedad 'value' que es un array
    if (payload.value && Array.isArray(payload.value)) {
      return payload.value.map((item: BackendSupplier) => this.fromBackend(item));
    }
    
    return [];
  }

  private toBackendTimestamp(): string {
    return new Date().toISOString();
  }

  private toStatePayload(s: Supplier, status: 'A' | 'I'): any {
    return {
      commercialName: s.commercial_name,
      phone: s.phone,
      email: s.email,
      ubigeoCode: s.ubigeo_code,
      ruc: s.ruc,
      address: s.address,
      status: status,
      updateDate: this.toBackendTimestamp()
    };
  }
}