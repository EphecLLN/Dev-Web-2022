CREATE TABLE users
(
    Id_user INT NOT NULL AUTO_INCREMENT,
    firstname varchar(50) NOT NULL,
    lastname varchar(50) NOT NULL,
    email varchar(50) NOT NULL,
    date_naissance DATE NOT NULL,
    pays VARCHAR(255) NOT NULL,
    ville VARCHAR(255) NOT NULL,
    code_postal VARCHAR(5) NOT NULL,
    password varchar(100) NOT NULL,
    PRIMARY KEY (Id_user)
);

CREATE TABLE tools
(
    Id_tool INT NOT NULL AUTO_INCREMENT,
    tool_name VARCHAR(100) NOT NULL,
    tool_category VARCHAR(20) NOT NULL,
    price_rental_day int NOT NULL,
    libre int NOT NULL,
    rentor int,
    PRIMARY KEY (Id_tool),
    FOREIGN KEY (rentor) REFERENCES Users(Id_user)
);

CREATE TABLE rental
(
    Id_rent INT NOT NULL AUTO_INCREMENT,
    tool int NOT NULL,
    rent_start DATE NOT NULL,
    rent_finish DATE NOT NULL,
    price_rental int NOT NULL,
    PRIMARY KEY (Id_rent),
    FOREIGN KEY (tool) REFERENCES Tools(Id_tool)
)