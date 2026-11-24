//Gera o inserts da tabela types_pokemons
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
        const pokemonTypes = data1.types.map(t => t.type.name);

        pokemonTypes.forEach(t => linhas.push(`(${pokemonNumber}, ${sql(t)})`));
    }

    console.log('INSERT INTO types_pokemons (numero_dex, nome) VALUES');
    console.log(linhas.join(',\n') + ';');
};

info().catch(erro => console.error('Erro:', erro.message));