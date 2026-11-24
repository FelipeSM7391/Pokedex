//Gera o inserts da tabela habilidades_pokemons (numero_dex, habilidade_id)
const fetchPokemon1 = async (pokemon) => {
    const APIResponse1 = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

    if (APIResponse1.status == 200) {
        const data1 = await APIResponse1.json();
        return data1;
    }
    throw new Error(`Pokémon ${pokemon}: erro ${APIResponse1.status}`);
};

const sql = (valor) => (valor == null || valor == undefined) ? 'NULL' : `'${String(valor).replace(/'/g, "''")}'`;

const info = async () => {
    const linhas = [];

    for (let pkmon = 1; pkmon <= 1025; pkmon++) {
        const data1 = await fetchPokemon1(pkmon);

        const pokemonNumber = data1.id;
        const pokemonAbilities = data1.abilities.map(a => a.ability.name);

        pokemonAbilities.forEach(a => linhas.push(`(${pokemonNumber}, (SELECT id FROM habilidades WHERE nome = ${sql(a)}))`));
    }

    console.log('INSERT INTO habilidades_pokemons (numero_dex, habilidade_id) VALUES');
    console.log(linhas.join(',\n') + ';');
};

info().catch(erro => console.error('Erro:', erro.message));