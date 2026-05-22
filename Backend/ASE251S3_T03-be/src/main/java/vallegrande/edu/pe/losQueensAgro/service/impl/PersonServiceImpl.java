package vallegrande.edu.pe.losQueensAgro.service.impl;

import org.springframework.stereotype.Service;
import vallegrande.edu.pe.losQueensAgro.model.Person;
import vallegrande.edu.pe.losQueensAgro.repository.PersonRepository;
import vallegrande.edu.pe.losQueensAgro.service.PersonService;

import java.util.List;
import java.util.Optional;
import java.time.LocalDateTime;

@Service
public class PersonServiceImpl implements PersonService {

    private final PersonRepository personRepository;

    public PersonServiceImpl(PersonRepository personRepository) {
        this.personRepository = personRepository;
    }

    // Obtener todas las personas
    @Override
    public List<Person> findAll() {
        return personRepository.findAll();
    }

    // Buscar por estado (A = activo, I = inactivo)
    @Override
    public List<Person> findByState(String state) {
        return personRepository.findByState(state);
    }

    // Buscar por ID
    @Override
    public Optional<Person> findById(Long id) {
        return personRepository.findById(id);
    }

    // Guardar nueva persona
    @Override
    public Person save(Person person) {
        person.setId(null);
        person.setUpdate_date(null);
        person.setDeleted_date(null);
        person.setRestored_date(null);
        person.setCreated_date(LocalDateTime.now());
        person.setState("A"); // opcional: por defecto activo

        return personRepository.save(person);
    }

    // Actualizar persona
    @Override
    public Person update(Long id, Person person) {

        Person existente = personRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Persona no encontrada"));

        existente.setUbigeo_code(person.getUbigeo_code());
        existente.setName(person.getName());
        existente.setLast_name(person.getLast_name());
        existente.setDocument_type(person.getDocument_type());
        existente.setDocument_number(person.getDocument_number());
        existente.setPhone(person.getPhone());
        existente.setEmail(person.getEmail());
        existente.setRole(person.getRole());
        existente.setStreet(person.getStreet());
        existente.setPassword(person.getPassword());
        existente.setState(person.getState());

        existente.setUpdate_date(LocalDateTime.now());

        return personRepository.save(existente);
    }

    // Eliminación lógica
    @Override
    public Person delete(Long id) {
        Person person = personRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Persona no encontrada"));

        person.setState("I");
        person.setDeleted_date(LocalDateTime.now());

        return personRepository.save(person);
    }

    // Restaurar persona
    @Override
    public Person restore(Long id) {
        Person person = personRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Persona no encontrada"));

        person.setState("A");
        person.setRestored_date(LocalDateTime.now());

        return personRepository.save(person);
    }
}