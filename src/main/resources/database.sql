DROP DATABASE IF EXISTS petshop;
CREATE DATABASE petshop;

\c petshop;

CREATE TABLE department (
  id            SERIAL           NOT NULL PRIMARY KEY,
  name     VARCHAR(100)     NOT NULL
);

CREATE TABLE employer (
  id            SERIAL           NOT NULL PRIMARY KEY,
  firstname     VARCHAR(100)     NOT NULL,
  lastname      VARCHAR(100)     NOT NULL,
  departmentId  INT              NOT NULL,

  FOREIGN KEY (departmentId) REFERENCES department(id)
);



