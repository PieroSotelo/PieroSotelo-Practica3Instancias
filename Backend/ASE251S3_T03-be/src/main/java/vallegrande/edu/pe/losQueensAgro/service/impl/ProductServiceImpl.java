package vallegrande.edu.pe.losQueensAgro.service.impl;


import org.springframework.stereotype.Service;
import vallegrande.edu.pe.losQueensAgro.model.product;
import vallegrande.edu.pe.losQueensAgro.repository.ProductRepository;
import vallegrande.edu.pe.losQueensAgro.service.ProductService;
import java.time.ZoneId;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;

    public ProductServiceImpl(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    //Obtiene y devuelve la lista completa de los productos registrasos
    @Override
    public List<product> findAll() {

        return productRepository.findAll();
    }

    // Busca y devuelve los productos según el estado ( A = activo, I = inactivo)
    @Override
    public List<product> findByState(String state) {
        return productRepository.findByState(state);
    }

    //Buscar un producto por su ID y lo devuelve si existe
    @Override
    public Optional<product> findById(Long id) {
        return productRepository.findById(id);
    }

    //Guarda un nuevo producto en la base de datos
    @Override
    public product save(product product) {
        product.setId(null);
        if (product.getCreated_date() == null) {
            product.setCreated_date(LocalDateTime.now(ZoneId.of("America/Lima")));
        }
        product.setUpdate_date(null);
        product.setDeleted_date(null);
        product.setRestored_date(null);
        return productRepository.save(product);
    }


    //Actualiza los datos de un producto existente
    @Override
    public product update(Long id, product product) {

        product existente = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Producto no encontrado"));

        existente.setCategory_id(product.getCategory_id());
        existente.setSupplier_id(product.getSupplier_id());
        existente.setName(product.getName());
        existente.setDescription(product.getDescription());
        existente.setMedia_unit(product.getMedia_unit());
        existente.setUnit_price(product.getUnit_price());
        existente.setExpiration_date(product.getExpiration_date());
        existente.setState(product.getState());

        existente.setUpdate_date(LocalDateTime.now(ZoneId.of("America/Lima")));

        return productRepository.save(existente);
    }


    //Realiza eliminación lógica del producto cambiando su estado a inactivo
    @Override
    public product delete(Long id) {
        product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Producto no encontrado"));

        product.setState("I");
        product.setDeleted_date(LocalDateTime.now(ZoneId.of("America/Lima")));

        return productRepository.save(product);
    }

    @Override
    public product restore(Long id) {
        product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Producto no encontrado"));
        product.setState("A");
        product.setRestored_date(LocalDateTime.now(ZoneId.of("America/Lima")));

        return productRepository.save(product);
    }
}