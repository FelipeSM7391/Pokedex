<div align = "center">
<p>
  <img src="./images/banner1.jpg" alt="Banner do Projeto" width="100%" >
</p>


# Trabalho de conclusão de ano (TCA)

Este projeto é um trabalho de cunho acadêmico com o objetivo de praticar um pouco de front-end, back-end e banco de dados postgres sql

[Perfil](https://github.com/FelipeSM7391) · [HTML](https://github.com/FelipeSM7391/Pokedex/blob/main/index.html) · [JS](https://github.com/FelipeSM7391/Pokedex/tree/main/js) · [CSS](https://github.com/FelipeSM7391/Pokedex/tree/main/css) · [Images](https://github.com/FelipeSM7391/Pokedex/tree/main/images)
</div>

## **Sobre o projeto**
Uma Pokédex interativa com visual inspirado na Rotom-dex. O usuário pode buscar qualquer um dos **1025 Pokémon** pelo nome ou pelo número da Pokédex e ver seus dados completos. Todas as informações vêm de um banco de dados próprio hospedado no Supabase, e os sprites são carregados do repositório oficial da PokéAPI.

## **Funcionalidades**
<ul>
  <li>Busca por nome ou número da Pokédex</li>
  <li>Navegação entre Pokémon com os botões anterior (<code>&lt;</code>) e próximo (<code>&gt;</code>)</li>
  <li>Painel de detalhes (botão <code>+</code> / <code>-</code>) com altura, peso, habitat, pré-evolução, tipos, habilidades, status base e descrição</li>
  <li>Fundo da tela do Rotom que muda de acordo com o habitat do Pokémon</li>
</ul>

## **Técnologias usadas**
<ul>
  <li>HTML</li>
  <li>CSS</li>
  <li>JavaScript</li>
  <li>Supabase</li>
  <li>Banco de dados PostgreSQL</li>
</ul>

## **Como funciona**
<ul>
  <li><b>Supabase:</b> fornece todos os dados de texto e números (nome, altura, peso, habitat, pré-evolução, status, descrição, tipos e habilidades) através da API REST, consultada em <code>js/script.js</code> com a configuração de <code>js/Api.js</code>.</li>
  <li><b>PokéAPI:</b> os sprites são carregados do repositório <a href="https://github.com/PokeAPI/sprites">PokeAPI/sprites</a>. Além disso, a API REST (<code>pokeapi.co</code>) foi usada <b>uma única vez</b>, pelos scripts <code>Fetch*.js</code>, para gerar os <code>INSERT</code>s que popularam o banco.</li>
  <li><b>Habitat.js:</b> observa o Pokémon exibido e troca o fundo da tela conforme o habitat. Quando não há habitat, usa <i>grassland</i> como padrão.</li>
</ul>

## **Banco de dados**
O banco é composto por 6 tabelas, criadas em `Pokedex.sql`:

| Tabela | Descrição |
|---|---|
| `pokemons` | Dados principais de cada Pokémon (número, nome, altura, peso, descrição, habitat, pré-evolução e status base) |
| `habitats` | Lista de habitats |
| `types` | Lista de tipos |
| `habilidades` | Lista de habilidades |
| `types_pokemons` | Relação N:N entre Pokémon e tipos |
| `habilidades_pokemons` | Relação N:N entre Pokémon e habilidades |

> **Observação:** a PokéAPI só informa habitat para os Pokémon até o nº 386 (Deoxys). Os demais ficam sem habitat e usam o fundo padrão.

## **Estrutura de pastas**
```
Pokedex/
├── index.html
├── css/
│   └── style.css
├── js/
│   ├── Api.js
│   ├── script.js
│   └── Habitat.js
├── images/
│   └── Habitat/
├── favicons/
└── sql/
    ├── Pokedex.sql
    ├── insert_pk.sql
    └── Fetch*.js
```

## **Créditos**
<ul>
  <li><a href="https://pokeapi.co/">PokéAPI</a> pelos dados e sprites</li>
  <li><a href="https://supabase.com/">Supabase</a> pelo banco de dados e API</li>
</ul>

## **Autor**
Feito por [Felipe SM](https://github.com/FelipeSM7391).