package vallegrande.edu.pe.losQueensAgro.repository;

import vallegrande.edu.pe.losQueensAgro.model.product;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends  JpaRepository<product, Long> {

    List<product> findByState(String state);
}