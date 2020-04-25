
const pokemonSection = document.querySelector('#show-pokemon-container')
const pokemonURL = 'http://localhost:9000/pokemons'
const movesURL = 'http://localhost:9000/moves'
fetch(pokemonURL)
  .then(response => response.json())
  .then(data => makePokemon(data))

fetch(movesURL)
  .then(response => response.json())
  .then(data => populateDropDown(data))

  function makePokemon(pokemons){
    pokemons.forEach(pokemon =>{
      pokemonSection.innerHTML = pokemonSection.innerHTML +
      `<div id=pokemon-${pokemon.id}
        <h2>
          <a href='http://localhost:3000/showPokemon/${pokemon.id}'>${pokemon.name}</a>
    
        </h2>
        <p>${pokemon.move.name}</p>
        <button id=delete-pokemon-${pokemon.id} onclick="deletePokemon(${pokemon.id})">delete</button>
      </div>
      `
    })
  }

  function deletePokemon(id){
    const pokemonToDelete = document.querySelector(`#pokemon-${id}`)
    pokemonToDelete.remove()

    fetch(pokemonURL+ '/' + id, {
      method: 'delete'
    })
    .then(response => response.json());
  }

  function populateDropDown(moves){
    const selectOptions = document.querySelector('#select-options')

    moves.forEach(move => {
      selectOptions.innerHTML = selectOptions.innerHTML + 
      `<option value="${move.id}">${move.name}</option>`
    })
  }


