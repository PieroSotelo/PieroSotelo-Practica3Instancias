package vallegrande.edu.pe.losQueensAgro.service;

import vallegrande.edu.pe.losQueensAgro.model.product;
import java.util.List;
import java.util.Optional;
public interface ProductService {

    List<product> findAll();

    List<product> findByState(String state);

    Optional<product> findById(Long id);

    product save(product product);

    product update(Long id, product product);

    product delete(Long id);

    product restore(Long id);

}
