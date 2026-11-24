//Gera o INSERT da tabela pokemons
//Uso: node Fetch_pokemons.js > arquivo.sql
const fetchPokemon1 = async (pokemon) => {
    const APIResponse1 = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

    if (APIResponse1.status == 200) {
        const data1 = await APIResponse1.json();
        return data1;
    }
    throw new Error(`Pokémon ${pokemon}: erro ${APIResponse1.status}`);
};
const fetchPokemon2 = async (pokemon) => {
    const APIResponse2 = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemon}`)

    if (APIResponse2.status == 200){
        const data2 = await APIResponse2.json();
        return data2;

    }
    throw new Error(`Pokémon ${pokemon}: erro ${APIResponse2.status}`);
};

const sql = (valor) => (valor == null || valor == undefined) ? 'NULL' : `'${String(valor).replace(/'/g, "''")}'`;

const info = async () => {
    console.log('INSERT INTO pokemons (numero_dex, nome, altura, peso, desc_dex, habitat, pre_evo, hp, atk, def, sp_atk, sp_def, speed) VALUES');

    for (let pkmon = 1; pkmon <= 1025; pkmon++) {
        const data1 = await fetchPokemon1(pkmon);
        const data2 = await fetchPokemon2(pkmon);

        const pokemonNumber = data1.id;
        const pokemonName = data2.name;
        const pokemonHeight = data1.height/10;
        const pokemonWeight = data1.weight/10;

        const pokemonPreEvo = data2.evolves_from_species ? data2.evolves_from_species.name : null;
        const pokemonHabitat = data2.habitat ? data2.habitat.name : null;
        const entradaEn = data2.flavor_text_entries.find(e => e.language.name == 'en');
        const pokemonDesc = entradaEn ? entradaEn.flavor_text.replace(/\u00ad\s*/g, '').replace(/\s+/g, ' ').trim() : null;

        //Status base dos pokemons
        const pokemonhp = data1.stats[0].base_stat;
        const pokemonatk = data1.stats[1].base_stat;
        const pokemondef = data1.stats[2].base_stat;
        const pokemonsp_atk = data1.stats[3].base_stat;
        const pokemonsp_def = data1.stats[4].base_stat;
        const pokemonspeed = data1.stats[5].base_stat;

        const linha = [
            pokemonNumber,
            sql(pokemonName),
            pokemonHeight,
            pokemonWeight,
            sql(pokemonDesc),
            sql(pokemonHabitat),
            sql(pokemonPreEvo),
            pokemonhp,
            pokemonatk,
            pokemondef,
            pokemonsp_atk,
            pokemonsp_def,
            pokemonspeed
        ].join(', ');

        console.log(`(${linha})${pkmon == 1025 ? ';' : ','}`);
    }
};

info().catch(erro => console.error('Erro:', erro.message));