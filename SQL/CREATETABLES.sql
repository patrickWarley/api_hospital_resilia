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

CREATE TABLE medicamentos(
  id int(11) NOT NULL auto_increment,
  valor float,
  qtd_estoque int(11),
  nome varchar(100),
  lote DATE,
  validade DATE,
  PRIMARY KEY(id)
);

CREATE TABLE pacientes(
  id int(11) NOT NULL auto_increment,
  nome varchar(50),
  telefone int(11),
  sobrenome varchar(50),
  cpf varchar(14),
  data_nascimento DATE,
  endereco varchar(100),
  email varchar(100),
  password varchar(50),
  PRIMARY KEY(id)
);