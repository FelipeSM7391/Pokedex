//Pega as informações da API "pokeAPI" online, e retorna elas no formato SQL para colocar no Insert
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
    for (let pkmon = 1; pkmon <= 1025; pkmon++) {
        const data1 = await fetchPokemon1(pkmon);
        const data2 = await fetchPokemon2(pkmon);

        const pokemonNumber = data1.id;
        const pokemonName = data2.name;
        const pokemonHeight = data1.height;
        const pokemonWeight = data1.weight;
        const pokemonAbilities = data1.abilities.map(a => a.ability.name).join(', ');
        const pokemonType1 = data1.types[0] ? data1.types[0].type.name : null;
        const pokemonType2 = data1.types[1] ? data1.types[1].type.name : null;

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
            sql(pokemonAbilities),
            sql(pokemonType1),
            sql(pokemonType2),
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