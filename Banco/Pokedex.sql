--Create database pokedex;
--DROP DATABASE IF EXISTS pokedex;
--\c pokedex;

DROP TABLE IF EXISTS habilidades_pokemons;
DROP TABLE IF EXISTS types_pokemons;
DROP TABLE IF EXISTS pokemons;
DROP TABLE IF EXISTS habitats;
DROP TABLE IF EXISTS types;
DROP TABLE IF EXISTS habilidades;

create table habitats (
    nome text primary key
);

create table types (
    nome text primary key
);

create table habilidades (
    id serial primary key,
    nome varchar(50) not null unique
);

create table pokemons (
    id serial primary key,
    numero_dex integer not null unique,
    nome varchar(50) not null,
    altura numeric(4,1) not null,
    peso numeric(5,1) not null,
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

create table types_pokemons (
    numero_dex integer not null references pokemons(numero_dex),
    nome text not null references types(nome),
    primary key (numero_dex, nome)
);

create table habilidades_pokemons (
    numero_dex integer not null references pokemons(numero_dex),
    habilidade_id integer not null references habilidades(id),
    primary key (numero_dex, habilidade_id)
);