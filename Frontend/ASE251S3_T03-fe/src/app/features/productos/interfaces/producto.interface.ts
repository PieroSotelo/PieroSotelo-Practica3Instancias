//Exportamos la interfaz del producto, que se conectará con el service para obtener los datos de la API
export interface Producto {
    //Definimos las propiedades del producto
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
    updated_date?: string | null;
    deleted_date?: string | null;
    restored_date?: string | null;
}