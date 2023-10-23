
const pokeApi = {}

// Convertendo esse detalhes
async function convertPokeApiDetailToPokemon(pokeDetail) {
    const pokemon = new Pokemon()

    pokemon.number = pokeDetail.id
    pokemon.name = pokeDetail.name

    const types =  pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [ type ] = types

    pokemon.types = types
    pokemon.type = type

    pokemon.photo = pokeDetail.sprites['versions']['generation-v']['black-white']['animated'].front_default;

    // Aguarda a resposta da API
    const description = await pokeApi.pokeDescription(pokemon.name);


    pokemon.description = description.flavor_text_entries[1].flavor_text;

    // Insere a pesquisa no retorno do Pokémon
    pokemon.search = input.value;

    return pokemon
}

// Pegando os Detalhes dos pokemons
pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
            .then((response) => response.json())
            .then(convertPokeApiDetailToPokemon)
}

// Pegando os dados do pokemon e devolvendo JSON
pokeApi.getPokemons = (offset = 0, limit = 6) => {
    const url = `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`

    return fetch(url)
            .then((response) => response.json())
            .then((jsonBody) => jsonBody.results)
            .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
            .then((detailsRequests) => Promise.all(detailsRequests))
            .then((pokemonsDetails) => pokemonsDetails)
            .catch((error) => console.error(error))

}

// Pegando a descrição do pokemon e devolvendo JSON
pokeApi.pokeDescription = (pokemon) => {
    const UrlAPIDescription = `https://pokeapi.co/api/v2/pokemon-species/${pokemon}`
    
    // Retorna uma Promise
    return fetch(UrlAPIDescription)
            .then((response) => response.json());
};

// Buscando um pokemon na API
pokeApi.searchPokemon = async (pokemon) => {
    const APiResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    const data = await APiResponse.json();
    return data
};