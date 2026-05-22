--Creamos la base de datos
CREATE DATABASE  losQueensAgroDB;
GO

USE losQueensAgroDB;
GO

-- Table: category
CREATE TABLE category (
    id int IDENTITY(1,1) NOT NULL,
    name varchar(100)  NOT NULL,
    description varchar(150)  NOT NULL,
    status char(1)  NOT NULL,
    CONSTRAINT category_pk PRIMARY KEY  (id)
);


-- Table: order_Details
CREATE TABLE order_Details (
    id int  IDENTITY(1,1) NOT NULL,
    sale_order_id int  NOT NULL,
    product_id int  NOT NULL,
    quantity decimal(5,2)  NOT NULL,
    sub_total decimal(7,2)  NOT NULL,
    CONSTRAINT order_Details_pk PRIMARY KEY  (id)
);


-- Table: person
CREATE TABLE person (
    id int IDENTITY(1,1) NOT NULL,
    ubigeo_code char(6)  NOT NULL,
    name varchar(150)  NOT NULL,
    last_name varchar(200)  NOT NULL,
    document_type char(3)  NOT NULL,
    document_number char(15) unique  NOT NULL,
    phone char(9) unique NOT NULL,
    email varchar(150) unique NULL,
    role char(3)  NOT NULL,
    street varchar(150)  NOT NULL,
    password varchar(100) NULL,
    state char(1)  NOT NULL,
    created_date datetime  NOT NULL,
    update_date datetime  NULL,
    deleted_date datetime  NULL,
    restored_date datetime  NULL,
    CONSTRAINT person_pk PRIMARY KEY  (id)
);


-- Table: product
CREATE TABLE product (
    id int IDENTITY(1,1) unique NOT NULL,
    category_id int  NOT NULL,
    supplier_id int  NOT NULL,
    name varchar(100)   NOT NULL,
    description varchar(400)  NOT NULL,
    media_unit varchar(100)  NOT NULL,
    unit_price decimal(5,2)  NOT NULL,
    state char(1)  NOT NULL,
    expiration_date datetime  NOT NULL,
    created_date datetime default NULL,
    update_date datetime  NULL,
    deleted_date datetime  NULL,
    restored_date datetime  NULL,
    CONSTRAINT product_pk PRIMARY KEY  (id)
);

-- Table: sale_order
CREATE TABLE sale_order (
    id int IDENTITY(1,1) NOT NULL,
    person_id int  NOT NULL,
    sale_order_date datetime  NOT NULL,
    status char(1)  NOT NULL,
    total decimal(7,2)  NOT NULL,
    delivery_type char(2)  NOT NULL,
    payment_method char(2)  NOT NULL,
    notes nvarchar(max)  NOT NULL,
    warehouse_id int  NOT NULL,
    CONSTRAINT sale_order_pk PRIMARY KEY  (id)
);

-- Table: stock
CREATE TABLE stock (
    id int IDENTITY(1,1) NOT NULL,
    product_id int  NOT NULL,
    warehouse_id int  NOT NULL,
    quantity int  NOT NULL,
    last_update datetime  NOT NULL,
    status char(1)  NOT NULL,
    CONSTRAINT stock_pk PRIMARY KEY  (id)
);

-- Table: stock_movement
CREATE TABLE stock_movement (
    id int IDENTITY(1,1) NOT NULL,
    movement_type char(1)  NOT NULL,
    quantity int  NOT NULL,
    reason nvarchar(max)  NOT NULL,
    movement_date datetime  NOT NULL,
    person_id int  NOT NULL,
    product_id int  NOT NULL,
    warehouse_id int  NOT NULL,
    order_Details_id int  NOT NULL,
    CONSTRAINT stock_movement_pk PRIMARY KEY  (id)
);

-- Table: supplier
CREATE TABLE supplier (
    id int IDENTITY(1,1) NOT NULL,
    commercial_name varchar(150) unique NOT NULL,
    phone varchar(9)unique NOT NULL,
    email varchar(150)unique NOT NULL,
    ubigeo_code char(6) NOT NULL,
    ruc varchar(11) unique NOT NULL,
    address varchar(200) NOT NULL,
    status char(1) NOT NULL,
    created_date datetime NOT NULL,
    update_date datetime NULL,
    deleted_date datetime NULL,
    restored_date datetime NULL,
    CONSTRAINT supplier_pk PRIMARY KEY (id)
);



-- Table: ubigeo
CREATE TABLE ubigeo (
    code char(6)  NOT NULL,
    region varchar(150) NOT NULL,
    province varchar(150)  NOT NULL,
    district varchar(150)  NOT NULL,
    CONSTRAINT ubigeo_pk PRIMARY KEY  (code)
);

-- Table: warehouse
CREATE TABLE warehouse (
    id int IDENTITY(1,1) NOT NULL,
    name varchar(100)  NOT NULL,
    address varchar(150)  NOT NULL,
    status char(1)  NOT NULL,
    CONSTRAINT warehouse_pk PRIMARY KEY  (id)
);

-- foreign keys
-- Reference: Details_sale_order (table: order_Details)
ALTER TABLE order_Details ADD CONSTRAINT Details_sale_order
    FOREIGN KEY (sale_order_id)
    REFERENCES sale_order (id);

-- Reference: order_Details_product (table: order_Details)
ALTER TABLE order_Details ADD CONSTRAINT order_Details_product
    FOREIGN KEY (product_id)
    REFERENCES product (id);

-- Reference: order_person (table: sale_order)
ALTER TABLE sale_order ADD CONSTRAINT order_person
    FOREIGN KEY (person_id)
    REFERENCES person (id);

-- Reference: person_ubigeo (table: person)
ALTER TABLE person ADD CONSTRAINT person_ubigeo
    FOREIGN KEY (ubigeo_code)
    REFERENCES ubigeo (code);

-- Reference: product_category (table: product)
ALTER TABLE product ADD CONSTRAINT product_category
    FOREIGN KEY (category_id)
    REFERENCES category (id);

-- Reference: product_supplier (table: product)
ALTER TABLE product ADD CONSTRAINT product_supplier
    FOREIGN KEY (supplier_id)
    REFERENCES supplier (id);

-- Reference: sale_order_warehouse (table: sale_order)
ALTER TABLE sale_order ADD CONSTRAINT sale_order_warehouse
    FOREIGN KEY (warehouse_id)
    REFERENCES warehouse (id);

-- Reference: stock_movement_order_Details (table: stock_movement)
ALTER TABLE stock_movement ADD CONSTRAINT stock_movement_order_Details
    FOREIGN KEY (order_Details_id)
    REFERENCES order_Details (id);

-- Reference: stock_movement_person (table: stock_movement)
ALTER TABLE stock_movement ADD CONSTRAINT stock_movement_person
    FOREIGN KEY (person_id)
    REFERENCES person (id);

-- Reference: stock_movement_product (table: stock_movement)
ALTER TABLE stock_movement ADD CONSTRAINT stock_movement_product
    FOREIGN KEY (product_id)
    REFERENCES product (id);

-- Reference: stock_movement_warehouse (table: stock_movement)
ALTER TABLE stock_movement ADD CONSTRAINT stock_movement_warehouse
    FOREIGN KEY (warehouse_id)
    REFERENCES warehouse (id);

-- Reference: stock_product (table: stock)
ALTER TABLE stock ADD CONSTRAINT stock_product
    FOREIGN KEY (product_id)
    REFERENCES product (id);

-- Reference: stock_warehouse (table: stock)
ALTER TABLE stock ADD CONSTRAINT stock_warehouse
    FOREIGN KEY (warehouse_id)
    REFERENCES warehouse (id);

-- Reference: supplier_ubigeo (table: supplier)
ALTER TABLE supplier ADD CONSTRAINT supplier_ubigeo
    FOREIGN KEY (ubigeo_code)
    REFERENCES ubigeo (code);

 /*  INSERTS TABLA: category  */

INSERT INTO category (name, description, status)
VALUES
('Fertilizantes', 'Productos para mejorar nutrientes', 'A'),
('Herbicidas', 'Control de malezas', 'A'),
('Insecticidas', 'Control de insectos', 'A'),
('Fungicidas', 'Control de hongos', 'A'),
('Semillas', 'Semillas certificadas', 'A'),
('Herramientas', 'Herramientas agrícolas', 'A'),
('Riego', 'Sistemas de riego', 'A'),
('Abonos', 'Abonos orgánicos', 'A'),
('Bioestimulantes', 'Estimulación vegetal', 'A'),
('Maquinaria', 'Equipos agrícolas', 'A');
GO


/*  INSERTS TABLA: ubigeo  */

INSERT INTO ubigeo (code, region, province, district)
VALUES
('150101', 'Lima', 'Lima', 'Lima'),
('150102', 'Lima', 'Lima', 'Ancon'),
('150103', 'Lima', 'Lima', 'Ate'),
('150104', 'Lima', 'Lima', 'Barranco'),
('150105', 'Lima', 'Lima', 'Breña'),
('130101', 'La Libertad', 'Trujillo', 'Trujillo'),
('040101', 'Arequipa', 'Arequipa', 'Arequipa'),
('080101', 'Cusco', 'Cusco', 'Cusco'),
('200101', 'Piura', 'Piura', 'Piura'),
('230101', 'Tacna', 'Tacna', 'Tacna');
GO


/*  INSERTS TABLA: warehouse */

INSERT INTO warehouse (name, address, status)
VALUES
('Almacen Norte', 'Av. Industrial 100', 'A'),
('Almacen Sur', 'Av. Primavera 200', 'A'),
('Almacen Centro', 'Jr. Comercio 300', 'A'),
('Almacen Este', 'Av. Los Olivos 400', 'A'),
('Almacen Oeste', 'Av. Peru 500', 'A'),
('Deposito A', 'Calle 1', 'A'),
('Deposito B', 'Calle 2', 'A'),
('Deposito C', 'Calle 3', 'A'),
('Deposito D', 'Calle 4', 'A'),
('Deposito E', 'Calle 5', 'A');
GO


/* INSERTS TABLA: supplier */

INSERT INTO supplier
(commercial_name, phone, email, ubigeo_code, ruc, address,
 status, created_date)
VALUES
('AgroFertil SAC', '987654321', 'contacto1@agro.com', '150101', '20111111111', 'Av. Lima 100', 'A', GETDATE()),
('Campo Verde', '987654322', 'contacto2@agro.com', '150102', '20111111112', 'Av. Lima 101', 'A', GETDATE()),
('BioCrop Peru', '987654323', 'contacto3@agro.com', '150103', '20111111113', 'Av. Lima 102', 'A', GETDATE()),
('AgroMax', '987654324', 'contacto4@agro.com', '150104', '20111111114', 'Av. Lima 103', 'A', GETDATE()),
('GreenFields', '987654325', 'contacto5@agro.com', '150105', '20111111115', 'Av. Lima 104', 'A', GETDATE()),
('FertiPlus', '987654326', 'contacto6@agro.com', '130101', '20111111116', 'Av. Lima 105', 'A', GETDATE()),
('EcoAgro', '987654327', 'contacto7@agro.com', '040101', '20111111117', 'Av. Lima 106', 'A', GETDATE()),
('AgroAndes', '987654328', 'contacto8@agro.com', '080101', '20111111118', 'Av. Lima 107', 'A', GETDATE()),
('PeruCultivos', '987654329', 'contacto9@agro.com', '200101', '20111111119', 'Av. Lima 108', 'A', GETDATE()),
('NaturalFarm', '987654330', 'contacto10@agro.com', '230101', '20111111120', 'Av. Lima 109', 'A', GETDATE());
GO


/* INSERTS TABLA: person */

INSERT INTO person
(ubigeo_code, name, last_name, document_type,
 document_number, phone, email, role, street,
 password, state, created_date)
VALUES
('150101', 'Juan', 'Perez', 'DNI', '70000001', '900000001', 'juan@gmail.com', 'ADM', 'Av Peru 101', '12345', 'A', GETDATE()),
('150102', 'Maria', 'Lopez', 'DNI', '70000002', '900000002', 'maria@gmail.com', 'CLI', 'Av Peru 102', '12345', 'A', GETDATE()),
('150103', 'Carlos', 'Torres', 'DNI', '70000003', '900000003', 'carlos@gmail.com', 'EMP', 'Av Peru 103', '12345', 'A', GETDATE()),
('150104', 'Ana', 'Ramos', 'DNI', '70000004', '900000004', 'ana@gmail.com', 'CLI', 'Av Peru 104', '12345', 'A', GETDATE()),
('150105', 'Luis', 'Diaz', 'DNI', '70000005', '900000005', 'luis@gmail.com', 'EMP', 'Av Peru 105', '12345', 'A', GETDATE()),
('130101', 'Jose', 'Fernandez', 'DNI', '70000006', '900000006', 'jose@gmail.com', 'ADM', 'Av Peru 106', '12345', 'A', GETDATE()),
('040101', 'Lucia', 'Mendoza', 'DNI', '70000007', '900000007', 'lucia@gmail.com', 'CLI', 'Av Peru 107', '12345', 'A', GETDATE()),
('080101', 'Miguel', 'Castro', 'DNI', '70000008', '900000008', 'miguel@gmail.com', 'EMP', 'Av Peru 108', '12345', 'A', GETDATE()),
('200101', 'Rosa', 'Vega', 'DNI', '70000009', '900000009', 'rosa@gmail.com', 'CLI', 'Av Peru 109', '12345', 'A', GETDATE()),
('230101', 'Pedro', 'Silva', 'DNI', '70000010', '900000010', 'pedro@gmail.com', 'ADM', 'Av Peru 110', '12345', 'A', GETDATE());
GO


/* INSERTS TABLA: product */

INSERT INTO product
(category_id, supplier_id, name, description,
 media_unit, unit_price, state, expiration_date,
 created_date)
VALUES
(1,1,'Urea','Fertilizante nitrogenado','Bolsa',120.50,'A','2027-01-01',GETDATE()),
(2,2,'Glifosato','Herbicida concentrado','Litro',45.00,'A','2027-02-01',GETDATE()),
(3,3,'Cipermetrina','Insecticida potente','Litro',60.00,'A','2027-03-01',GETDATE()),
(4,4,'Azufre','Fungicida agrícola','Kg',25.00,'A','2027-04-01',GETDATE()),
(5,5,'Maiz Hibrido','Semilla premium','Bolsa',150.00,'A','2027-05-01',GETDATE()),
(6,6,'Pala Agricola','Herramienta resistente','Unidad',80.00,'A','2029-01-01',GETDATE()),
(7,7,'Manguera Riego','Sistema flexible','Unidad',90.00,'A','2029-02-01',GETDATE()),
(8,8,'Compost','Abono natural','Saco',40.00,'A','2027-06-01',GETDATE()),
(9,9,'BioGrow','Bioestimulante vegetal','Litro',75.00,'A','2027-07-01',GETDATE()),
(10,10,'Motocultor','Equipo agrícola','Unidad',999.99,'A','2030-01-01',GETDATE());
GO


/* INSERTS TABLA: sale_order */

INSERT INTO sale_order
(person_id, sale_order_date, status, total,
 delivery_type, payment_method, notes, warehouse_id)
VALUES
(1,GETDATE(),'P',200,'DO','EF','Entrega rápida',1),
(2,GETDATE(),'P',300,'LO','TR','Cliente frecuente',2),
(3,GETDATE(),'P',150,'DO','YA','Pago pendiente',3),
(4,GETDATE(),'P',400,'LO','PL','Entrega urgente',4),
(5,GETDATE(),'P',500,'DO','EF','Sin observaciones',5),
(6,GETDATE(),'P',250,'LO','TR','Orden normal',6),
(7,GETDATE(),'P',180,'DO','YA','Pago completo',7),
(8,GETDATE(),'P',320,'LO','PL','Entrega parcial',8),
(9,GETDATE(),'P',275,'DO','EF','Cliente nuevo',9),
(10,GETDATE(),'P',600,'LO','TR','Entrega programada',10);
GO


/* INSERTS TABLA: order_Details */

INSERT INTO order_Details
(sale_order_id, product_id, quantity, sub_total)
VALUES
(1,1,2,241.00),
(2,2,3,135.00),
(3,3,1,60.00),
(4,4,5,125.00),
(5,5,2,300.00),
(6,6,1,80.00),
(7,7,2,180.00),
(8,8,4,160.00),
(9,9,3,225.00),
(10,10,1,999.99);
GO


/* INSERTS TABLA: stock */

INSERT INTO stock
(product_id, warehouse_id, quantity, last_update, status)
VALUES
(1,1,100,GETDATE(),'A'),
(2,2,90,GETDATE(),'A'),
(3,3,80,GETDATE(),'A'),
(4,4,70,GETDATE(),'A'),
(5,5,60,GETDATE(),'A'),
(6,6,50,GETDATE(),'A'),
(7,7,40,GETDATE(),'A'),
(8,8,30,GETDATE(),'A'),
(9,9,20,GETDATE(),'A'),
(10,10,10,GETDATE(),'A');
GO


/* INSERTS TABLA: stock_movement  */

INSERT INTO stock_movement
(movement_type, quantity, reason, movement_date,
 person_id, product_id, warehouse_id, order_Details_id)
VALUES
('S',2,'Venta realizada',GETDATE(),1,1,1,1),
('S',3,'Venta realizada',GETDATE(),2,2,2,2),
('S',1,'Venta realizada',GETDATE(),3,3,3,3),
('S',5,'Venta realizada',GETDATE(),4,4,4,4),
('S',2,'Venta realizada',GETDATE(),5,5,5,5),
('S',1,'Venta realizada',GETDATE(),6,6,6,6),
('S',2,'Venta realizada',GETDATE(),7,7,7,7),
('S',4,'Venta realizada',GETDATE(),8,8,8,8),
('S',3,'Venta realizada',GETDATE(),9,9,9,9),
('S',1,'Venta realizada',GETDATE(),10,10,10,10);
GO


/*crear un nuevo dato*/

INSERT INTO product
(
category_id,
supplier_id,
name,
description,
media_unit,
unit_price,
state,
expiration_date,
created_date
)
VALUES
(
1,
1,
'NPK Premium',
'Fertilizante completo para cultivos',
'Bolsa',
120.50,
'A',
'2027-12-31',
GETDATE()
);

GO

/*Listar*/

SELECT
p.id,
c.name AS category,
s.commercial_name AS supplier,
p.name,
p.description,
p.media_unit,
p.unit_price,
p.state,
p.expiration_date,
p.created_date,
p.update_date,
p.deleted_date,
p.restored_date
FROM product p
INNER JOIN category c
ON p.category_id = c.id
INNER JOIN supplier s
ON p.supplier_id = s.id;

GO 

/*Actualizar*/

UPDATE product
SET
category_id = 2,
supplier_id = 2,
name = 'Glifosato Ultra',
description = 'Herbicida mejorado',
media_unit = 'Litro',
unit_price = 75.90,
expiration_date = '2028-01-01',
update_date = GETDATE()
WHERE id = 1
AND state = 'A';

GO 

/*Eliminar*/

UPDATE product
SET
state = 'I',
deleted_date = GETDATE()
WHERE id = 1;

GO 

/*Restaurar*/

UPDATE product
SET
state = 'A',
restored_date = GETDATE()
WHERE id = 1;

GO 
