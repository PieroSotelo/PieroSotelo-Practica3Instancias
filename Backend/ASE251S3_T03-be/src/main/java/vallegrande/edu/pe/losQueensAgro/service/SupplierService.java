package vallegrande.edu.pe.losQueensAgro.service;

import vallegrande.edu.pe.losQueensAgro.model.Supplier;
import java.util.List;

public interface SupplierService {
    // Obtener todos los proveedores (activos e inactivos)
    List<Supplier> findAll();
    
    // Obtener proveedores por estado
    List<Supplier> findByStatus(String status);
    
    // Obtener solo los proveedores activos
    List<Supplier> findActive();
    
    // Obtener un proveedor por ID
    Supplier findById(Integer id);
    
    // Crear un nuevo proveedor
    Supplier create(Supplier supplier);
    
    // Actualizar un proveedor existente
    Supplier update(Integer id, Supplier supplier);
    
    // Eliminar lógicamente un proveedor
    Supplier delete(Integer id);
    
    // Restaurar un proveedor eliminado lógicamente
    Supplier restore(Integer id);
}