const pokemonName = document.querySelector('.pokemon_name');
const pokemonNumb = document.querySelector('.pokemon_num');
const pokemonImg = document.querySelector('.pokemon_image');

const form = document.querySelector('.form');
const input = document.querySelector(`.input_search`);


const buttonPrev = document.querySelector(`.btn-prev`);
const buttonNext = document.querySelector(`.btn-next`);

let search_pkm = 0;

const fetchPokemon = async (pokemon)  => {
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

    if (APIResponse.status ==200){
        const data = await APIResponse.json();
        return data;
    }
}

const renderpkmon = async (pokemon) => {

        pokemonName.innerHTML = `Loading...`
        pokemonNumb.innerHTML = ``

        const data = await fetchPokemon(pokemon);

        if (data) {
            pokemonImg.style.display = `block`;
            pokemonName.innerHTML = data.name
            pokemonNumb.innerHTML = data.id
            pokemonImg.src = data[`sprites`][`versions`][`generation-v`][`black-white`][`animated`][`front_default`];
            input.value = ``;
            search_pkm = data.id;
        }else {
            pokemonImg.style.display = `none`;
            pokemonName.innerHTML = `Not Found :/`
            pokemonNumb.innerHTML = `???`
            input.value = ``;
        }

}

form.addEventListener(`submit`, (event) => {

    event.preventDefault();

    renderpkmon(input.value.toLowerCase());
});


buttonPrev.addEventListener(`click`, () => {
    if (search_pkm > 1){
    search_pkm -= 1;
    renderpkmon (search_pkm);
    }else{
        search_pkm = 10325;
        renderpkmon(search_pkm);
    }
    if ((search_pkm > 1025) && (search_pkm < 10001)){
        renderpkmon(1025)
    }
    
});

buttonNext.addEventListener(`click`, () => {
    if (search_pkm < 10325){
    search_pkm += 1;
    renderpkmon(search_pkm);
    }else {
        search_pkm = 1;
        renderpkmon(search_pkm);
    }
    if ((search_pkm > 1025) && (search_pkm < 10001)){
        renderpkmon(10001)
    }

});
