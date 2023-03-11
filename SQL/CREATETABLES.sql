CREATE TABLE medicos (
  id int(11) NOT NULL auto_increment, 
  crm varchar(11) NOT NULL,
  nome varchar(50) NOT NULL,
  data_nascimento DATE,
  sobrenome varchar(100) NOT NULL, 
  especialidade varchar(50) NOT NULL,
  email varchar(100) NOT NULL,
  password varchar(30) NOT NULL,
  telefone int(11) NOT NULL,
  endereco varchar(100) NOT NULL,
  PRIMARY KEY(id)
);