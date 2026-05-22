package vallegrande.edu.pe.losQueensAgro.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Entity
@Table(name = "supplier")
@Data
public class Supplier {

    // Campo 1: ID del proveedor (Long)
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    // Campo 2: Nombre comercial del proveedor (String)
    @Column(name = "commercial_name", length = 150)
    private String commercialName;

    // Campo 3: Teléfono de contacto (String)
    @Column(length = 9)
    private String phone;

    // Campo 4: Email del proveedor (String)
    @Column(length = 150)
    private String email;

    // Campo 5: Código UBIGEO de ubicación (String)
    @Column(name = "ubigeo_code", length = 6)
    private String ubigeoCode;

    // Campo 6: Número de RUC del proveedor (String)
    @Column(name = "ruc", length = 11)
    private String ruc;

    // Campo 7: Dirección del proveedor (String)
    @Column(name = "address", length = 200)
    private String address;

    // Campo 8: Estado del proveedor (String) - A: Activo, I: Inactivo
    @Column(length = 1)
    private String status;

    // CAMPOS DE AUDITORÍA

    // Campo 9: Fecha de creación del proveedor (LocalDateTime)
    @Column(name = "created_date", updatable = false)
    private LocalDateTime createdDate;

    // Campo 10: Fecha de actualización del proveedor (LocalDateTime)
    @Column(name = "update_date")
    private LocalDateTime updateDate;

    // Campo 11: Fecha de eliminación del proveedor (LocalDateTime)
    @Column(name = "deleted_date")
    private LocalDateTime deletedDate;

    // Campo 12: Fecha de restauración del proveedor (LocalDateTime)
    @Column(name = "restored_date")
    private LocalDateTime restoredDate;
}