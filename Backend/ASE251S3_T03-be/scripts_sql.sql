-- Ejecuta esto primero para crear la base de datos:
CREATE DATABASE losQueensAgroDB;
GO

-- Luego ejecuta esto para crear las tablas:
USE losQueensAgroDB;
GO

CREATE TABLE product (
    id BIGINT PRIMARY KEY IDENTITY(1,1),
    name VARCHAR(255),
    description VARCHAR(255),
    media_unit VARCHAR(255),
    unit_price FLOAT,
    expiration_date DATETIME2,
    state VARCHAR(255),
    created_date DATETIME2,
    update_date DATETIME2,
    deleted_date DATETIME2,
    restored_date DATETIME2
);
GO

CREATE TABLE supplier (
    id INT PRIMARY KEY IDENTITY(1,1),
    commercial_name VARCHAR(150),
    phone VARCHAR(9),
    email VARCHAR(150),
    ubigeo_code VARCHAR(6),
    ruc VARCHAR(11),
    address VARCHAR(200),
    status VARCHAR(1),
    created_date DATETIME2,
    update_date DATETIME2,
    deleted_date DATETIME2,
    restored_date DATETIME2
);
GO

CREATE TABLE person (
    id INT PRIMARY KEY IDENTITY(1,1),
    ubigeo_code CHAR(6) NOT NULL,
    name VARCHAR(150) NOT NULL,
    last_name VARCHAR(200) NOT NULL,
    document_type CHAR(3) NOT NULL,
    document_number CHAR(15) NOT NULL,
    phone CHAR(9) NOT NULL,
    email VARCHAR(150) NULL,
    role CHAR(3) NOT NULL,
    street VARCHAR(150) NOT NULL,
    password VARCHAR(100) NULL,
    state CHAR(1) NOT NULL,
    created_date DATETIME NOT NULL,
    update_date DATETIME NULL,
    deleted_date DATETIME NULL,
    restored_date DATETIME NULL
);

SELECT * FROM product;
SELECT * FROM supplier;
SELECT * FROM person;
