--Create database pokedex;
--DROP DATABASE IF EXISTS pokedex;
--\c pokedex;

DROP TABLE IF EXISTS pokemons;
DROP TABLE IF EXISTS habitats;
DROP TABLE IF EXISTS types;

create table habitats(
    nome text primary key
);

create table types (
    tipo text primary key
);

create table pokemons(
    id serial primary key,
    numero_dex integer not null unique,
    nome varchar(50),
    altura numeric(4, 1) not null,
    peso numeric(5,1) not null,
    ab1 VARCHAR(50) not null,
    ab2 VARCHAR(50),
    ab3 VARCHAR(50),
    type1 text not null references types(tipo),
    type2 text references types(tipo),
    desc_dex text not null,
    habitat text references habitats(nome), --infelizmente só tem habitat até o deoxys 386 :(
    pre_evo text,
    hp integer not null,
    atk integer not null,
    def integer not null,
    sp_atk integer not null,
    sp_def integer not null,
    speed integer not null
);