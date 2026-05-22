import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

import { Person } from '../interfaces/person.interface';

interface BackendPerson {
  id?: number;
  ubigeo_code?: string;
  name?: string;
  last_name?: string;
  document_type?: string;
  document_number?: string;
  phone?: string;
  email?: string;
  role?: string;
  street?: string;
  password?: string;
  state?: string;
  deletedAt?: string | null;
}

interface BackendPersonListResponse {
  value?: BackendPerson[];
  Count?: number;
}

@Injectable({
  providedIn: 'root',
})
export class PersonasService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = 'http://localhost:8080/api/person';

  getAllPersonas(): Observable<Person[]> {
    return this.http
      .get<BackendPerson[] | BackendPersonListResponse | BackendPerson>(this.baseUrl)
      .pipe(map((payload) => this.toList(payload).map((p) => this.fromBackend(p))));
  }

  findPersonaById(id: number): Observable<Person> {
    return this.http
      .get<BackendPerson>(`${this.baseUrl}/${id}`)
      .pipe(map((p) => this.fromBackend(p)));
  }

  createPersona(data: Omit<Person, 'id'>): Observable<Person> {
    return this.http
      .post<BackendPerson>(`${this.baseUrl}/save`, this.toBackend(data))
      .pipe(map((p) => this.fromBackend(p)));
  }

  updatePersona(id: number, data: Omit<Person, 'id'>): Observable<Person> {
    return this.http
      .put<BackendPerson>(`${this.baseUrl}/update/${id}`, this.toBackend(data))
      .pipe(map((p) => this.fromBackend(p)));
  }

  softDeletePersona(id: number): Observable<Person> {
    return this.http
      .patch<BackendPerson>(`${this.baseUrl}/delete/${id}`, {})
      .pipe(map((p) => this.fromBackend(p)));
  }

  restorePersona(id: number): Observable<Person> {
    return this.http
      .patch<BackendPerson>(`${this.baseUrl}/restore/${id}`, {})
      .pipe(map((p) => this.fromBackend(p)));
  }

  private fromBackend(p: BackendPerson): Person {
    return {
      id: p.id ?? 0,
      ubigeo_code: p.ubigeo_code ?? '',
      name: p.name ?? '',
      last_name: p.last_name ?? '',
      document_type: p.document_type ?? '',
      document_number: p.document_number ?? '',
      phone: p.phone ?? '',
      email: p.email ?? '',
      role: p.role ?? '',
      street: p.street ?? '',
      state: (p.state === 'I' ? 'I' : 'A') as 'A' | 'I',
    };
  }

  private toBackend(data: Omit<Person, 'id'>): Omit<BackendPerson, 'id'> {
    return {
      ubigeo_code: data.ubigeo_code ?? '',
      name: data.name,
      last_name: data.last_name,
      document_type: data.document_type,
      document_number: data.document_number,
      phone: data.phone ?? '',
      email: data.email ?? '',
      role: data.role ?? '',
      street: data.street ?? '',
      state: data.state,
    };
  }

  private toList(payload: BackendPerson[] | BackendPersonListResponse | BackendPerson): BackendPerson[] {
    if (Array.isArray(payload)) return payload;
    if ('value' in payload && Array.isArray(payload.value)) return payload.value;
    return [payload as BackendPerson];
  }
}
