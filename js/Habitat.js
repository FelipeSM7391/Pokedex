const screen = document.querySelector('#pokedex-screen');
const nome_dele = document.querySelector('.pokemon_name');
const habi_dele = document.querySelector('.pokemon_habitat');

const HABITATS = [
  'grassland', 'forest', 'cave', 'mountain', 'sea',
  'waters-edge', 'urban', 'rough-terrain', 'rare'
];
const DEFAULT_HABITAT = 'grassland';

const applyHabitat = () => {
  const nome = nome_dele.textContent.trim();
  if (nome.startsWith('Loading')) return;//para esperar o loading 

  let habitat = habi_dele.textContent.trim().toLowerCase();

  if (nome.startsWith('Not Found') || !HABITATS.includes(habitat)) { //se der not found fica grassland padrao
    habitat = DEFAULT_HABITAT;
  }

  screen.dataset.habitat = habitat;
};

const observador = new MutationObserver(applyHabitat);
[nome_dele, habi_dele].forEach((el) =>
  observador.observe(el, { childList: true, characterData: true, subtree: true })
);

applyHabitat();