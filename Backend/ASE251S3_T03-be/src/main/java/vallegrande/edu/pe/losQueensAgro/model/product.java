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
@Data                     //Generar los getters y setters
@Table(name= "product")   //Nombre en la tabla en la base de datos
public class product {

    @Id
    @Column(name = "id")  //Nombre del campo en la base de datos
    @GeneratedValue(strategy = GenerationType.IDENTITY) //Para que el ID se genere de manera automatica
    private Long id;  //Nombre del atributo en la clase java
    
    //ID de la categoría del producto
    @Column(name = "category_id") //Nombre del campo en la base de datos
    private Long category_id; //Nombre del atributo en la clase java

    //ID del proveedor del producto
    @Column(name = "supplier_id") //Nombre del campo en la base de datos
    private Long supplier_id; //Nombre del atributo en la clase java


    //Nombre del producto
    @Column(name = "name") //Nombre del campo en la base de datos
    private String name;   //Nombre del atributo en la clase java

    //Descripción del producto
    @Column(name = "description")  //Nombre del campo en la base de datos
    private String description;    //Nombre del atributo en la clase java

    //Unidad de medida del producto
    @Column(name = "media_unit")   //Nombre del campo en la base de datos
    private String media_unit;     //Nombre del atributo en la clase java

    //Precio unico del producto
    @Column(name = "unit_price")  //Nombre del campo en la base de datos
    private Double unit_price;    //Nombre del atributo en la clase java


    //Fecha de vencimiento del producto
    @Column(name = "expiration_date") //Nombre del campo en la base de datos
    private LocalDateTime expiration_date; //Nombre del atributo en la clase java

    //Estado del producto
    @Column(name = "state")       //Nombre del campo en la base de datos
    private String state;         //Nombre del atributo en la clase java
    //CAMPOS DE AUDITORIA

    //Fecha de creación del producto
    @Column(name = "created_date", updatable = false) //Nombre del campo en la base de datos
    private LocalDateTime created_date; //Nombre del atributo en la clase java

    //Fecha de actualización del producto
    @Column(name = "update_date") //Nombre del campo en la base de datos
    private LocalDateTime update_date; //Nombre del atributo en la clase java

    //Fecha de eliminación del producto
    @Column(name = "deleted_date") //Nombre del campo en la base de datos
    private LocalDateTime deleted_date; //Nombre del atributo en la clase java

    //Fecha de restauración del producto
    @Column(name = "restored_date") //Nombre del campo en la base de datos
    private LocalDateTime restored_date; //Nombre del atributo en la clase java

}
