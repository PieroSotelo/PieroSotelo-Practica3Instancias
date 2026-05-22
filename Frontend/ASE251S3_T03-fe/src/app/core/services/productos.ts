import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, switchMap } from 'rxjs';

export interface Producto {
	id: number;
	category_id: number;
	supplier_id: number;
	name: string;
	description: string;
	media_unit: string;
	unit_price: number;
	expiration_date: string;
	state: string;
	created_date?: string;
	update_date?: string;
	deleted_date?: string | null;
	restored_date?: string | null;
}

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
	update_date?: string;
	deleted_date?: string | null;
	restored_date?: string | null;
}

interface BackendProductoListResponse {
	value?: BackendProducto[];
	Count?: number;
}

@Injectable({
	providedIn: 'root'
})
export class ProductosService {
	private readonly http = inject(HttpClient);
	private readonly baseUrl = 'http://localhost:8085/api/product';

	getAllProductos(): Observable<Producto[]> {
		return this.http
			.get<BackendProducto[] | BackendProductoListResponse | BackendProducto>(this.baseUrl)
			.pipe(map((payload) => this.toList(payload).map((producto) => this.fromBackend(producto))));
	}

	findProductoById(id: number): Observable<Producto> {
		return this.http
			.get<BackendProducto>(`${this.baseUrl}/${id}`)
			.pipe(map((producto) => this.fromBackend(producto)));
	}

	createProducto(data: Omit<Producto, 'id' | 'created_date' | 'update_date' | 'deleted_date' | 'restored_date'>): Observable<Producto> {
		const payload = {
			...this.toBackend(data),
			created_date: this.toBackendTimestamp(),
			update_date: null,
			deleted_date: null,
			restored_date: null,
		};

		return this.http
			.post<BackendProducto>(`${this.baseUrl}/save`, payload)
			.pipe(map((producto) => this.fromBackend(producto)));
	}

	updateProducto(id: number, data: Omit<Producto, 'id' | 'created_date' | 'update_date' | 'deleted_date' | 'restored_date'>): Observable<Producto> {
		const payload = this.toBackend(data);

		return this.http
			.put<BackendProducto>(`${this.baseUrl}/${id}`, payload)
			.pipe(
				catchError(() => this.http.put<BackendProducto>(`${this.baseUrl}/update/${id}`, payload)),
				map((producto) => this.fromBackend(producto))
			);
	}

	softDeleteProducto(id: number): Observable<Producto> {
		return this.findProductoById(id)
			.pipe(switchMap((producto) => this.updateProducto(id, this.toStatePayload(producto, 'I'))));
	}

	restoreProducto(id: number): Observable<Producto> {
		return this.findProductoById(id)
			.pipe(switchMap((producto) => this.updateProducto(id, this.toStatePayload(producto, 'A'))));
	}

	private fromBackend(producto: BackendProducto): Producto {
		return {
			id: producto.id ?? 0,
			category_id: producto.category_id ?? 0,
			supplier_id: producto.supplier_id ?? 0,
			name: producto.name ?? '',
			description: producto.description ?? '',
			media_unit: producto.media_unit ?? '',
			unit_price: producto.unit_price ?? 0,
			expiration_date: producto.expiration_date ?? '',
			state: producto.state ?? 'A',
			created_date: producto.created_date,
			update_date: producto.update_date,
			deleted_date: producto.deleted_date ?? null,
			restored_date: producto.restored_date ?? null,
		};
	}

	private toBackend(producto: Omit<Producto, 'id' | 'created_date' | 'update_date' | 'deleted_date' | 'restored_date'>): Omit<BackendProducto, 'id' | 'created_date' | 'update_date' | 'deleted_date' | 'restored_date'> {
		return {
			category_id: producto.category_id,
			supplier_id: producto.supplier_id,
			name: producto.name,
			description: producto.description,
			media_unit: producto.media_unit,
			unit_price: producto.unit_price,
			expiration_date: producto.expiration_date,
			state: producto.state,
		};
	}

	private toList(payload: BackendProducto[] | BackendProductoListResponse | BackendProducto): BackendProducto[] {
		if (Array.isArray(payload)) {
			return payload;
		}

		if ('value' in payload && Array.isArray(payload.value)) {
			return payload.value;
		}

		return [payload as BackendProducto];
	}

	private toBackendTimestamp(date = new Date()): string {
		const year = date.getFullYear();
		const month = String(date.getMonth() + 1).padStart(2, '0');
		const day = String(date.getDate()).padStart(2, '0');
		const hours = String(date.getHours()).padStart(2, '0');
		const minutes = String(date.getMinutes()).padStart(2, '0');
		const seconds = String(date.getSeconds()).padStart(2, '0');

		return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
	}

	private toStatePayload(producto: Producto, state: string): Omit<Producto, 'id' | 'created_date' | 'update_date' | 'deleted_date' | 'restored_date'> {
		return {
			category_id: producto.category_id,
			supplier_id: producto.supplier_id,
			name: producto.name,
			description: producto.description,
			media_unit: producto.media_unit,
			unit_price: producto.unit_price,
			expiration_date: producto.expiration_date,
			state,
		};
	}
}