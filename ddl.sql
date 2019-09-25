-- Criando tabela de agendamento
CREATE TABLE agendamento (
	id_agendamento integer not null GENERATED ALWAYS AS IDENTITY (START WITH 1 INCREMENT BY 1),
    professor varchar(255) not null,
    sala varchar(255) not null,
    data date not null,
    periodo varchar(255) not null,
    flag_cliente varchar(255) not null,
    quantidade int not null,
    solicitante varchar(255) not null,
    PRIMARY KEY(id_agendamento)
);

-- Criando tabela de material
CREATE TABLE material (
	id_material integer not null GENERATED ALWAYS AS IDENTITY (START WITH 1 INCREMENT BY 1),
    professor varchar(255) not null,
    material varchar(255) not null,
    sala varchar(255) not null,
    data date not null,
    periodo varchar(255) not null,
    solicitante varchar(255) not null,
    PRIMARY KEY(id_material)
);

-- Criação da tabela de login
create table acessos (
    id_acesso integer not null GENERATED ALWAYS AS IDENTITY (START WITH 1 INCREMENT BY 1)
    matricula varchar(255),
    senha varchar(255), 
    PRIMARY KEY (id_acesso)
);