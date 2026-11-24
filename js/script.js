import { API_URL, headers } from './Api.js';

const pokemonName = document.querySelector('.pokemon_name');
const pokemonNumb = document.querySelector('.pokemon_num');
const pokemonImg = document.querySelector('.pokemon_image');

const form = document.querySelector('.form');
const input = document.querySelector('.input_search');

const buttonPrev = document.querySelector('.btn-prev');
const buttonNext = document.querySelector('.btn-next');
const buttonDetails = document.querySelector('.btn-details');
const screen = document.querySelector('#pokedex-screen');

let search_pkm = 0;

const fetchPokemon = async (pokemon) => {
    const filtro = isNaN(pokemon) ? `nome=eq.${pokemon}` : `numero_dex=eq.${pokemon}`;

    const APIResponse = await fetch(
        `${API_URL}pokemons?${filtro}&select=*,types_pokemons(nome),habilidades_pokemons(habilidades(nome))`,
        { headers }
    );

    if (APIResponse.status == 200) {
        const data = await APIResponse.json();
        return data[0];
    }
}

const renderpkmon = async (pokemon) => {

    pokemonName.innerHTML = `Loading...`;
    pokemonNumb.innerHTML = ``;

    const data = await fetchPokemon(pokemon);

    if (data) {
        pokemonImg.style.display = `block`;
        pokemonName.innerHTML = data.nome;
        pokemonNumb.innerHTML = data.numero_dex;

        const base = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/';
        pokemonImg.src = data.numero_dex <= 649
        ? `${base}versions/generation-v/black-white/animated/${data.numero_dex}.gif`
        : `${base}${data.numero_dex}.png`;

        document.querySelector('.details_number').textContent = `Nº ${data.numero_dex}`;
        document.querySelector('.details_name').textContent = data.nome;
        document.querySelector('.pokemon_height').textContent = `${data.altura} m`;
        document.querySelector('.pokemon_weight').textContent = `${data.peso} kg`;
        document.querySelector('.pokemon_habitat').textContent = data.habitat ?? '—';
        document.querySelector('.pokemon_pre_evo').textContent = data.pre_evo ?? '—';
        document.querySelector('.pokemon_types').textContent = data.types_pokemons.map(t => t.nome).join(', ');
        document.querySelector('.pokemon_abilities').textContent = data.habilidades_pokemons.map(h => h.habilidades.nome).join(', ');
        document.querySelector('.pokemon_hp').textContent = data.hp;
        document.querySelector('.pokemon_atk').textContent = data.atk;
        document.querySelector('.pokemon_def').textContent = data.def;
        document.querySelector('.pokemon_sp_atk').textContent = data.sp_atk;
        document.querySelector('.pokemon_sp_def').textContent = data.sp_def;
        document.querySelector('.pokemon_speed').textContent = data.speed;
        document.querySelector('.pokemon_description').textContent = data.desc_dex;

        buttonDetails.disabled = false;
        input.value = ``;
        search_pkm = data.numero_dex;
        
    } else {
        pokemonImg.style.display = `none`;
        pokemonName.innerHTML = `Not Found :/`;
        pokemonNumb.innerHTML = `???`;

        screen.classList.remove('details-open');
        buttonDetails.textContent = '+';
        buttonDetails.disabled = true;
        input.value = ``;
    }
}

buttonDetails.addEventListener(`click`, () => {
    screen.classList.toggle('details-open');
    buttonDetails.textContent = screen.classList.contains('details-open') ? '-' : '+';
});

form.addEventListener(`submit`, (event) => {
    event.preventDefault();
    renderpkmon(input.value.toLowerCase().trim());
});

buttonPrev.addEventListener(`click`, () => {
    search_pkm = search_pkm > 1 ? search_pkm - 1 : 1025;
    renderpkmon(search_pkm);
});

buttonNext.addEventListener(`click`, () => {
    search_pkm = search_pkm < 1025 ? search_pkm + 1 : 1;
    renderpkmon(search_pkm);
});