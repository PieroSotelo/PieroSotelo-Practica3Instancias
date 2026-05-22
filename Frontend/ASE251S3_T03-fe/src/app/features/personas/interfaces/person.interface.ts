export interface Person {
  id: number;
  ubigeo_code?: string;
  name: string;
  last_name: string;
  document_type: string;
  document_number: string;
  phone?: string;
  email?: string;
  role?: string;
  street?: string;
  state: 'A' | 'I';
}
