-- Arquivo de apoio, caso você queira criar tabelas como as aqui criadas para a API funcionar.
-- Você precisa executar os comandos no banco de dados para criar as tabelas,
-- ter este arquivo aqui não significa que a tabela em seu BD estará como abaixo!

/* para workbench - local - desenvolvimento */
CREATE DATABASE HSO;
USE HSO;

CREATE TABLE tbRedeHospitalar(
	idRede INT PRIMARY KEY auto_increment,
	nomeRede VARCHAR(45)
);

select * from tbRedeHospitalar;

insert into tbRedeHospitalar 
values (null, 'plena');


CREATE TABLE tbFilialHospital(
	idFilial INT PRIMARY KEY auto_increment,
    fkRede INT,
    FOREIGN KEY (fkRede) REFERENCES tbRedeHospitalar (idRede),
    cepFilial INT,
    numeroEndFilial VARCHAR(45),
    cnpjFilial VARCHAR(45),
    senhaFilial VARCHAR(45)
);

select * from tbFilialHospital;
    
CREATE TABLE tbTelefoneHospital(
	idTelefone INT PRIMARY KEY auto_increment,
	fkFilial INT,
    FOREIGN KEY (fkFilial) REFERENCES tbFilialHospital (idFilial),
    numeroTelefone VARCHAR(45),
    tipoNum VARCHAR(9),
    CHECK (tipoNum = 'Fixo' OR tipoNum = 'Celular' OR tipoNum = 'Whatsapp' OR tipoNum = 'Comercial')
);
  
CREATE TABLE tbUsuario(
	idUsuario INT PRIMARY KEY auto_increment,
	fkFilial INT,
    FOREIGN KEY (fkFilial) REFERENCES tbFilialHospital (idFilial),
	nomeUsuario VARCHAR(45),
	cpf VARCHAR(45),
	email VARCHAR(45),
    senha VARCHAR(45),
	cargo VARCHAR(45)
);

CREATE TABLE tbMaquina(
	idMaquina INT PRIMARY KEY auto_increment,
	fkFilial INT,
    FOREIGN KEY (fkFilial) REFERENCES tbFilialHospital (idFilial),
    hostName VARCHAR(45),
	marcaMaquina VARCHAR(45),
	alaMaquina VARCHAR(45),
    andarMaquina INT,
	sistemaOperacional VARCHAR(45),
    senhaMaquina VARCHAR(45)
);

CREATE TABLE tbComponente(
	idComponente INT PRIMARY KEY auto_increment,
	nomeComponente VARCHAR(45)
);

CREATE TABLE tbPacote(
	idPacote INT PRIMARY KEY auto_increment,
	fkMaquina INT,
	FOREIGN KEY (fkMaquina) REFERENCES tbMaquina (idMaquina),
	fkComponente INT,
    FOREIGN KEY (fkComponente) REFERENCES tbComponente (idComponente),
	valorTotal VARCHAR(45)
);

CREATE TABLE tbHistorico(
	idHistorico INT PRIMARY KEY auto_increment,
    fkPacote INT,
    FOREIGN KEY (fkPacote) REFERENCES tbPacote (idPacote),
    valorRegistro VARCHAR(45),
	momentoRegistro DATETIME DEFAULT CURRENT_TIMESTAMP
);
drop database hso;



/* para sql server - remoto - produção */

CREATE TABLE usuario (
	id INT PRIMARY KEY IDENTITY(1,1),
	nome VARCHAR(50),
	email VARCHAR(50),
	senha VARCHAR(50),
);

CREATE TABLE aviso (
	id INT PRIMARY KEY IDENTITY(1,1),
	titulo VARCHAR(100),
    descricao VARCHAR(150),
	fk_usuario INT FOREIGN KEY REFERENCES usuario(id)
); 

CREATE TABLE medida (
	id INT PRIMARY KEY IDENTITY(1,1),
	temperatura DECIMAL,
	umidade DECIMAL,
	momento DATETIME,
	fk_aquario INT
);


