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

CREATE TABLE unidades (
  id int(11) NOT NULL auto_increment,
  cnpj varchar(14) NOT NULL,
  nome varchar(50) NOT NULL,
  endereco varchar(100) NOT NULL,
  telefone varchar(20) NOT NULL,
  PRIMARY KEY(id)
);

CREATE TABLE exames(
  id int(11) NOT NULL auto_increment,
  nome_paciente varchar(100),
  cpf varchar(14),
  descricao varchar(200),
  nome_exame varchar(50),
  crm varchar(11),
  PRIMARY KEY(id)
);

CREATE TABLE consultas (
  id int(11) NOT NULL auto_increment,
  crm varchar(20) DEFAULT NULL,
  especialidade varchar(50) DEFAULT NULL,
  cpf_paciente varchar(20) DEFAULT NULL,
  data varchar(20) DEFAULT NULL,
  hora varchar(20) DEFAULT NULL,
  motivo_procura varchar(500) DEFAULT NULL,
  observacao_medico varchar(100) DEFAULT NULL,
  PRIMARY KEY(id)
);


INSERT INTO consultas(crm, especialidade, cpf_paciente, data, hora, motivo_procura, observacao_medico) VALUES
('CRM123453', 'Cardiologia', '15116313875', '1992-09-09', '12:00 PM', 'Teste', 'Teste'),
('CRM123452', 'Proctologia', '15116313874', '1992-08-09', '12:00 PM', 'Teste', 'Teste'),
('CRM123451', 'Pediatra', '15116313873', '1992-09-08', '12:00 PM', 'Teste', 'Teste'),
('CRM123450', 'Ginecologia', '15116313872', '1992-10-09', '12:00 PM', 'Teste', 'Teste'),
('CRM123449', 'Oncologia', '15116313871', '1992-12-09', '12:00 PM', 'Teste', 'Teste'),
('CRM123448', 'Nutrição', '15116313870', '1992-09-12', '12:00 PM', 'Teste', 'Teste'),
('CRM123447', 'Homeopatia', '15116313869', '1992-07-09', '12:00 PM', 'Teste', 'Teste'),
('CRM123446', 'Dermatologia', '15116313868', '1992-08-09', '12:00 PM', 'Teste', 'Teste'),
('CRM123445', 'Urologia', '15116313867', '1992-01-09', '12:00 PM', 'Teste', 'Teste'),
('CRM123444', 'Psicologia', '15116313866', '1992-02-09', '12:00 PM', 'Teste', 'Teste');

INSERT INTO exames(nome_paciente, cpf, descricao, nome_exame, crm) VALUES
('Jorge Luis', '15116313875', 'exame teste', 'Raio x', 'CRM123453'),
('Joao', '15116313874', 'exame teste', 'Hemograma', 'CRM123452'),
('Marcelo', '15116313873', 'exame teste', 'Raio x', 'CRM123451'),
('Luciana', '15116313872', 'exame teste', 'Raio x', 'CRM123450'),
('Leticia', '15116313873', 'exame teste', 'Raio x', 'CRM123451'),
('Sergio', '15116313873', 'exame teste', 'Raio x', 'CRM123451'),
('Denis', '15116313873', 'exame teste', 'Raio x', 'CRM123451');

INSERT INTO unidades(cnpj, nome, endereco, telefone) VALUES
('15815815816', "URRJ - UNIDADE RESILIA DO RIO DE JANEIRO", "Rua Madureira, 155", "02134267257"),
('15815815816', "UZORJ - UNIDADE DA ZONA OESTE DO RIO DE JANEIRO", "Rua campo grande, 155", "02134267252");

INSERT INTO pacientes(nome ,telefone ,sobrenome ,cpf ,data_nascimento ,endereco ,email ,password) VALUES
('Jorge Luis', '34267257', 'telles da silva', '15215215222', '1992-09-01', 'rua madureira, 14', 'patrickwarley@gmail.com', 'teste'),
('Joao', '34267257', 'telles da silva', '15215215222', '1992-09-01', 'rua madureira, 14', 'patrickwarley@gmail.com', 'teste'),
('Marcelo', '34267257', 'telles da silva', '15215215222', '1992-09-01', 'rua madureira, 14', 'patrickwarley@gmail.com', 'teste'),
('Luciana', '34267257', 'telles da silva', '15215215222', '1992-09-01', 'rua madureira, 14', 'patrickwarley@gmail.com', 'teste');

INSERT INTO medicamentos(valor, qtd_estoque, nome, lote, validade) VALUES
('985552','115','Testarodin - 500ml', '2023-03-24','2023-03-04'),
('985552','115','Lorazepam - 500ml', '2023-03-24','2023-03-04');

INSERT INTO medicos(crm, nome, data_nascimento, sobrenome, especialidade, email, password, telefone, endereco) VALUES
( 'CRMSP123456','Marcelinho','2023-03-12','Nascimento Andrade','Proctologista','Marcelo@gmail.com','oo25oo25','02134267257','Rua Alencar Peixoto, 4'),
( 'CRMSP123456','Sergio','2023-03-12','Da silva','Proctologista','Marcelo@gmail.com','oo25oo25','02134267257','Rua Alencar Peixoto, 4');