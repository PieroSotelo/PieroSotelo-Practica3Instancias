package vallegrande.edu.pe.losQueensAgro.repository;

import vallegrande.edu.pe.losQueensAgro.model.Person;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PersonRepository extends JpaRepository<Person, Long> {
    List<Person> findByState(String state);

}
