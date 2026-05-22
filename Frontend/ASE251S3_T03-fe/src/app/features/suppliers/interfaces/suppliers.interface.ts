export interface Supplier {
  id: number;
  commercial_name: string;
  phone: string;
  email: string;
  ubigeo_code: string;
  ruc: string;
  address: string;
  status: string; // 'A' | 'I'
  created_date?: string | Date;
  update_date?: string | Date | null;
  deleted_date?: string | Date | null;
  restored_date?: string | Date | null;
}