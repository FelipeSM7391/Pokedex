//Gera o inserts da tabela habitats
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
    const habitats = [];

    for (let pkmon = 1; pkmon <= 1025; pkmon++) {
        const data2 = await fetchPokemon2(pkmon);

        const pokemonHabitat = data2.habitat ? data2.habitat.name : null;
        if (pokemonHabitat && !habitats.includes(pokemonHabitat)) habitats.push(pokemonHabitat);
    }

    console.log('INSERT INTO habitats (nome) VALUES');
    console.log(habitats.map(h => `(${sql(h)})`).join(',\n') + ';');
};

info().catch(erro => console.error('Erro:', erro.message));