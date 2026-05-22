package vallegrande.edu.pe.losQueensAgro.rest;

import vallegrande.edu.pe.losQueensAgro.model.product;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperties;
import org.springframework.web.bind.annotation.*;
import vallegrande.edu.pe.losQueensAgro.service.ProductService;

import java.util.List;
import java.util.Optional;

import static org.springframework.data.jpa.domain.AbstractPersistable_.id;

@CrossOrigin(origins = "*")      //Permitir la conexión con el frontend
@RestController
@RequestMapping("/api/product") //Para la ruta donde se encontraran la API http://localhost:8085/api/product
@Tag(name = "Product API", description = "API for Product management")
public class ProductRest {

    //Inyección del  service
    private final ProductService productService;

    @Autowired
    public ProductRest(ProductService productService) {
        this.productService = productService;
    }

    //Mapear endpoint Listar Todos - tipo GET en POSTMAN
    @GetMapping
    @Operation(summary = "Get All Product", description = "Get All Product")
    public List<product> findAll(){
        return productService.findAll();
    }

    //Mapear Endpoint Listar por estado - tipo GET en POSTMAN
    @GetMapping("/state/{state}")
    @Operation(summary = "Get Product By STATE", description = "Get Product By STATE")
    public List<product> findBystate(@PathVariable String state) {
        return productService.findByState(state);
    }

    //Mapear Endpoint Listar por ID - tipo GET en POSTMAN
    @GetMapping("/{id}")
    @Operation(summary = "Get Product By ID", description = "Get Product By ID")
    public Optional<product> findById(@PathVariable Long id) {
        return productService.findById(id);
    }

    //Mapperar Endpoint Registrar - tipo POST en POSTMAN
    @PostMapping("/save")
    @Operation(summary = "Save Porduct", description = "Save Product")
    public product save(@RequestBody product product) {
        return productService.save(product);
    }

    //Mapear Endpoint Actualizar - tipo PUT en POSTMAN
    @PutMapping("/update/{id}")
    @Operation(summary = "Update Product", description = "Update Product")
    public product update(@PathVariable Long id, @RequestBody product product) {
        return productService.update(id, product);
    }

    //Mapear Endpoint Eliminar (Cambio de Estado) por ID - tipo PATCH en POSTMAN
    @PatchMapping("/delete/{id}")
    @Operation(summary = "Logical Delete Product", description = "Logical Delete Product")
    public product delete(@PathVariable Long id) {
        return productService.delete(id);
    }

    //Mapear endpoint Restaurar (Cambio de Estado) por ID - tipo PATCH en POSTMAN
    @PatchMapping("/restore/{id}")
    @Operation(summary = "Logical Restore Product", description = "Logical Restore Product")
    public product restore(@PathVariable Long id){
        return productService.restore(id);
    }

}
