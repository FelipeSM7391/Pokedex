//Gera o inserts da tabela habilidades
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
    const habilidades = [];

    for (let pkmon = 1; pkmon <= 1025; pkmon++) {
        const data1 = await fetchPokemon1(pkmon);

        const pokemonAbilities = data1.abilities.map(a => a.ability.name);
        pokemonAbilities.forEach(a => {
            if (!habilidades.includes(a)) habilidades.push(a);
        });
    }

    console.log('INSERT INTO habilidades (nome) VALUES');
    console.log(habilidades.map(h => `(${sql(h)})`).join(',\n') + ';');
};

info().catch(erro => console.error('Erro:', erro.message));