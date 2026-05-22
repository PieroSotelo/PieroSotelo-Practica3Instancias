package vallegrande.edu.pe.losQueensAgro.rest;

import vallegrande.edu.pe.losQueensAgro.model.Person;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperties;
import org.springframework.web.bind.annotation.*;
import vallegrande.edu.pe.losQueensAgro.service.PersonService;
import java.util.List;
import java.util.Optional;
import static org.springframework.data.jpa.domain.AbstractPersistable_.id;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/person") //Ruta base para acceder a los endpoints relacionados con personas
@Tag(name = "Person API", description = "Endpoints para gestionar personas")

public class PersonRest {
     //Inyección del  service
    private final PersonService PersonService;

    @Autowired
    public PersonRest(PersonService PersonService) {
        this.PersonService = PersonService;
    }

    //Mapear endpoint Listar Todos - tipo GET en POSTMAN
    @GetMapping
    @Operation(summary = "Get All Person", description = "Get All Person")
    public List<Person> findAll(){
        return PersonService.findAll();
    }

    //Mapear Endpoint Listar por estado - tipo GET en POSTMAN
    @GetMapping("/state/{state}")
    @Operation(summary = "Get Person By STATE", description = "Get Person By STATE")
    public List<Person> findBystate(@PathVariable String state) {
        return PersonService.findByState(state);
    }

    //Mapear Endpoint Listar por ID - tipo GET en POSTMAN
    @GetMapping("/{id}")
    @Operation(summary = "Get Person By ID", description = "Get Person By ID")
    public Optional<Person> findById(@PathVariable Long id) {
        return PersonService.findById(id);
    }

    //Mapperar Endpoint Registrar - tipo POST en POSTMAN
    @PostMapping("/save")
    @Operation(summary = "Save Person", description = "Save Person")
    public Person save(@RequestBody Person person) {
        return PersonService.save(person);
    }

    //Mapear Endpoint Actualizar - tipo PUT en POSTMAN
    @PutMapping("/update/{id}")
    @Operation(summary = "Update Person", description = "Update Person")
    public Person update(@PathVariable Long id, @RequestBody Person person) {
        return PersonService.update(id, person);
    }

    //Mapear Endpoint Eliminar (Cambio de Estado) por ID - tipo PATCH en POSTMAN
    @PatchMapping("/delete/{id}")
    @Operation(summary = "Logical Delete Person", description = "Logical Delete Person")
    public Person delete(@PathVariable Long id) {
        return PersonService.delete(id);
    }

    //Mapear endpoint Restaurar (Cambio de Estado) por ID - tipo PATCH en POSTMAN
    @PatchMapping("/restore/{id}")
    @Operation(summary = "Logical Restore Person", description = "Logical Restore Person")
    public Person restore(@PathVariable Long id){
        return PersonService.restore(id);
    }

}

