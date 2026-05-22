package vallegrande.edu.pe.losQueensAgro.rest;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import vallegrande.edu.pe.losQueensAgro.model.Supplier;
import vallegrande.edu.pe.losQueensAgro.service.SupplierService;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/v1/supplier")
@Tag(name = "Supplier API", description = "API for Supplier management with CRUD operations")
public class SupplierRest {

    @Autowired
    private SupplierService service;

    // Listar todos los proveedores activos
    @GetMapping
    @Operation(summary = "Get All Suppliers", description = "Retrieve list of all suppliers")
    public List<Supplier> list() {
        return service.findAll();
    }

    // Obtener proveedores por estado
    @GetMapping("/status/{status}")
    @Operation(summary = "Get Suppliers By Status", description = "Retrieve suppliers by status")
    public List<Supplier> findByStatus(@PathVariable String status) {
        return service.findByStatus(status);
    }

    // Obtener un proveedor por ID
    @GetMapping("/{id}")
    @Operation(summary = "Get Supplier By ID", description = "Retrieve a supplier by its ID")
    public Supplier getById(@PathVariable Integer id) {
        return service.findById(id);
    }

    // Crear un nuevo proveedor (POST)
    @PostMapping
    @Operation(summary = "Create New Supplier", description = "Create a new supplier with provided data - fecha-hora: created_date")
    public Supplier save(@RequestBody Supplier supplier) {
        return service.create(supplier);
    }

    // Actualizar un proveedor existente (PUT)
    @PutMapping("/{id}")
    @Operation(summary = "Update Supplier", description = "Update an existing supplier - fecha-hora: update_date")
    public Supplier update(@PathVariable Integer id, @RequestBody Supplier supplier) {
        return service.update(id, supplier);
    }

    // Eliminar lógicamente un proveedor (PATCH)
    @PatchMapping("/delete/{id}")
    @Operation(summary = "Logical Delete Supplier", description = "Logically delete a supplier by changing status to inactive - fecha-hora: deleted_date")
    public Supplier delete(@PathVariable Integer id) {
        return service.delete(id);
    }

    // Restaurar un proveedor eliminado lógicamente (PATCH)
    @PatchMapping("/restore/{id}")
    @Operation(summary = "Restore Supplier", description = "Restore a logically deleted supplier - fecha-hora: restored_date")
    public Supplier restore(@PathVariable Integer id) {
        return service.restore(id);
    }
}