package vallegrande.edu.pe.losQueensAgro.service;

import vallegrande.edu.pe.losQueensAgro.model.Person;
import java.util.List;
import java.util.Optional;

public interface PersonService {
    List<Person> findAll();
    List<Person> findByState(String state);
    Optional<Person> findById(Long id);
    Person save(Person Person);
    Person update(Long id, Person Person);
    Person delete(Long id);
    Person restore(Long id);

}
