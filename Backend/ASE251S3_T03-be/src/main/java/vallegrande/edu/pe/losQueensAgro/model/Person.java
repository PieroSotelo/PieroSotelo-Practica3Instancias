package vallegrande.edu.pe.losQueensAgro.model;
 
import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Data // Genera getters, setters, toString, equals y hashCode automáticamente
@Table(name = "person") // Especifica el nombre de la tabla en la base de datos
public class Person {
    @Id 
     @Column(name = "id")  //Nombre del campo en la base de datos
    @GeneratedValue(strategy = GenerationType.IDENTITY) //Para que el ID se genere de manera automatica
    private Long id;  //Nombre del atributo en la clase java
   
    //Ubigeo de la persona
   @Column(name = "ubigeo_code") //Nombre del campo en la base de datos
    private String ubigeo_code;   //Nombre del atributo en la clase java

    //Nombre de la persona
    @Column(name = "name") //Nombre del campo en la base de datos
    private String name;   //Nombre del atributo en la clase java

    //Apellido de la persona 
    @Column(name = "last_name")  //Nombre del campo en la base de datos
    private String last_name;    //Nombre del atributo en la clase java

    //Tipo de documento de la persona
    @Column(name = "document_type")   //Nombre del campo en la base de datos
    private String document_type;     //Nombre del atributo en la clase java

    //Número de documento de la persona
    @Column(name = "document_number")  //Nombre del campo en la base de datos
    private String document_number;    //Nombre del atributo en la clase java

    //Teléfono de la persona 
    @Column(name = "phone")  //Nombre del campo en la base de datos
    private  String phone;    //Nombre del atributo en la clase java


    //Correo Electrónico de la persona 
    @Column(name = "email") //Nombre del campo en la base de datos
    private String email; //Nombre del atributo en la clase java

   //Rol de la persona
    @Column(name = "role") //Nombre del campo en la base de datos
    private String role; //Nombre del atributo en la clase java

  //Calle de la persona
    @Column(name = "street") //Nombre del campo en la base de datos
    private  String street; //Nombre del atributo en la clase java

  //Contraseña de la persona
    @Column(name = "password") //Nombre del campo en la base de datos
    private  String password; //Nombre del atributo en la clase java

    //Estado de la persona 
    @Column(name = "state")       //Nombre del campo en la base de datos
    private String state;         //Nombre del atributo en la clase java

    //CAMPOS DE AUDITORIA

    //Fecha de creación de la persona  
  @Column(name = "created_date", updatable = false) //Nombre del campo en la base de datos
    private LocalDateTime created_date; //Nombre del atributo en la clase java

    //Fecha de actualización de la persona 
    @Column(name = "update_date") //Nombre del campo en la base de datos
    private LocalDateTime update_date; //Nombre del atributo en la clase java

    //Fecha de eliminación de la persona
    @Column(name = "deleted_date") //Nombre del campo en la base de datos
    private LocalDateTime deleted_date; //Nombre del atributo en la clase java

    //Fecha de restauración de la persona
    @Column(name = "restored_date") //Nombre del campo en la base de datos
    private LocalDateTime restored_date; //Nombre del atributo en la clase java

}


