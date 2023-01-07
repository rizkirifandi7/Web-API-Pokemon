import { Pokedex } from "./Pokedex.js";
const pokedexURL = `https://pokeapi.co/api/v2/pokemon`;
const colors = {
    fire: "#FDDFDF",
    grass: "#DEFDE0",
    electric: "#FCF7DE",
    water: "#DEF3FD",
    ground: "#f4e7da",
    rock: "#d5d5d4",
    fairy: "#fceaff",
    poison: "#d6b3ff",
    bug: "#f8d5a3",
    dragon: "#97b3e6",
    psychic: "#eaeda1",
    flying: "#F5F5F5",
    fighting: "#E6E0D4",
    normal: "#F5F5F5",
    ice: "#e0f5ff ",
};



const pokeContainer = document.querySelector(".poke-container");
const searchInput = document.querySelector("#search-input");
const pokedex = new Pokedex(pokedexURL);
const toTopBtn = document.querySelector(".back-to-top-button");
const pokeSearchForm = document.querySelector("#poke-search-form");

window.addEventListener('load', loadNextPageAndRender);
document.querySelector("#load-button").addEventListener("click", loadNextPageAndRender);

// TODO: Debounce mechanism can be added.
searchInput.addEventListener("input", () => {
  pokeContainer.innerHTML = "";
  pokedex.findPokemonsByName(searchInput.value).forEach(createPokemonBox);
});

async function loadNextPageAndRender() {
  const pokemons = await pokedex.getNextPage();
  pokemons.forEach(createPokemonBox);
}

function createPokemonBox(pokemon) {
  const { name } = pokemon;
  const id = pokemon.id.toString().padStart(3, "0");
  const type = pokemon.types[0].type.name

  const pokemonEl = document.createElement("div");
  pokemonEl.classList.add("poke-box");
  pokemonEl.style.backgroundColor = colors[type];
  pokemonEl.innerHTML = buildHtmlOfPokemon(id, name, type)
  pokeContainer.appendChild(pokemonEl);
}

function buildHtmlOfPokemon(id, name, type) {
  return `
  <img
    class="poke-img"
    src="https://assets.pokemon.com/assets/cms2/img/pokedex/full/${id}.png"
    alt="${name} Pokemon"
  />
  <h3 class="poke-name">${name}</h3>
  <p class="poke-id"># ${id}</p>
  <p class="poke-type">${type}</p>
  `
}


window.addEventListener("scroll", () => {
    if (window.scrollY > 300) toTopBtn.classList.add("show");
    else toTopBtn.classList.remove("show");
});

toTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
});

pokeSearchForm.addEventListener("submit", (e) => e.preventDefault());
