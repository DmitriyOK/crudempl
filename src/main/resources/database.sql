CREATE DATABASE company;

CREATE TABLE department (
  id            SERIAL           NOT NULL PRIMARY KEY,
  name     VARCHAR(100)          NOT NULL
);

CREATE TABLE employer (
  id            SERIAL           NOT NULL PRIMARY KEY,
  firstname     VARCHAR(100)     NOT NULL,
  lastname      VARCHAR(100)     NOT NULL,
  departmentId  INT              NOT NULL,

  FOREIGN KEY (departmentId) REFERENCES department(id)
);

CREATE UNIQUE INDEX firstname_lastname ON employer(firstname, lastname);
CREATE UNIQUE INDEX department_name ON department(name);

INSERT INTO department (name) VALUES ('Sales'), ('HR'), ('QA');
INSERT INTO employer (firstname, lastname, departmentId) VALUES ('Ivan','Ivanov',1), ('Anna','Popova',2), ('Olga','Ivanova',3);
