import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

export interface Client {
	id: number;
	nombre: string;
	apellido: string;
	email: string;
	telefono: string;
	activo: boolean;
	eliminado: boolean;
}

interface BackendClient {
	identificador: number;
	nombre: string;
	celular: string;
	correo: string;
	ruc: string;
	direccion: string;
	estado: string;
	deletedAt?: string | null;
}

@Injectable({
	providedIn: 'root'
})
export class ApiService {
	private readonly http = inject(HttpClient);
	private readonly baseUrl = 'http://localhost:8085/api/clientes';

	getAllClients(): Observable<Client[]> {
		return this.http
			.get<BackendClient[]>(this.baseUrl)
			.pipe(map((clients) => clients.map((client) => this.fromBackend(client))));
	}

	findClientById(id: number): Observable<Client> {
		return this.http
			.get<BackendClient>(`${this.baseUrl}/${id}`)
			.pipe(map((client) => this.fromBackend(client)));
	}

	createClient(data: Omit<Client, 'id' | 'eliminado'>): Observable<Client> {
		return this.http
			.post<BackendClient>(this.baseUrl, this.toBackend(data))
			.pipe(map((client) => this.fromBackend(client)));
	}

	updateClient(id: number, data: Omit<Client, 'id' | 'eliminado'>): Observable<Client> {
		return this.http
			.put<BackendClient>(`${this.baseUrl}/${id}`, this.toBackend(data))
			.pipe(map((client) => this.fromBackend(client)));
	}

	softDeleteClient(id: number): Observable<Client> {
		return this.http
			.patch<BackendClient>(`${this.baseUrl}/${id}/eliminar`, {})
			.pipe(map((client) => this.fromBackend(client)));
	}

	restoreClient(id: number): Observable<Client> {
		return this.http
			.patch<BackendClient>(`${this.baseUrl}/${id}/restaurar`, {})
			.pipe(map((client) => this.fromBackend(client)));
	}

	private fromBackend(client: BackendClient): Client {
		return {
			id: client.identificador,
			nombre: client.nombre,
			// El backend no maneja apellido separado; se mantiene vacio para no romper la UI.
			apellido: '',
			email: client.correo,
			telefono: client.celular,
			activo: client.estado === 'A',
			eliminado: client.deletedAt !== null && client.deletedAt !== undefined,
		};
	}

	private toBackend(client: Omit<Client, 'id' | 'eliminado'>): Omit<BackendClient, 'identificador' | 'deletedAt'> {
		return {
			nombre: client.nombre,
			celular: client.telefono,
			correo: client.email,
			// Campos requeridos por backend; se rellenan temporalmente para no bloquear el flujo.
			ruc: '00000000000',
			direccion: client.apellido || 'SIN_DIRECCION',
			estado: client.activo ? 'A' : 'I',
		};
	}
}