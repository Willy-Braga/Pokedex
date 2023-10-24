const pokeList = document.getElementById('poke-list');
const form = document.querySelector('#form');
const input = document.getElementById('input');
const maxRecords = 1017;
const limit = 2;
let offset = 0;

    // Renderizando os dados do pokemon e imprimindo na tela
function loadPokemonItens(offset, limit) {

    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
    
        let newHtml = pokemons.map((pokemon) =>`
        <li class="cartao-pokemon">
        
            <div class="informacoes">
                <span>${pokemon.name}</span>
                <span class="poke-number">#${pokemon.number}</span>
            </div>

            <img src="${pokemon.photo}" alt="${pokemon.name}" class="gif">

            <ul class="types">
                ${pokemon.types.map((type) => `<li class="type ${type}"><img src="src/images/poke-elements/${type}.png" alt="${type}" class="poke-img"></li>`).join('')}
            </ul>

            <p class="descricao">${pokemon.description}</p>
        </li>`
        ).join('');

        pokeList.innerHTML += newHtml;

        // Pesquisa pokemons pela api e imprime na tela
        form.addEventListener('submit', async (event) => {
            event.preventDefault();

            const searchPokemon = input.value.toLowerCase();

            // Obtém o Pokémon do retorno da API
            const pokemon = await pokeApi.searchPokemon(searchPokemon);
            
            // Verifica se o Pokémon existe
            if (!pokemon) {

                alert('O Pokémon não existe. Por favor insira um pokemon valido.');
            
            } else{
            
                // Adiciona o Pokémon ao newHtml
                const pokemonHtml = `
                <li class="cartao-pokemon">

                    <div class="informacoes">
                        <span>${pokemon.name}</span>
                        <span class="poke-number">#${pokemon.number}</span>
                    </div>

                    <img src="${pokemon.photo}" alt="${pokemon.name}" class="gif">

                    <ul class="types">
                        ${pokemon.types.map((type) => `<li class="type ${type}"><img src="src/images/poke-elements/${type}.png" alt="${type}" class="poke-img"></li>`).join('')}
                    </ul>

                    <p class="descricao" id="description">${pokemon.description}</p>
                </li>`;

                // Subistitui o HTML do Pokémon pesquisado ao HTML existente
                newHtml = pokemonHtml;

            };

                input.value = " ";

                // Substitui o HTML
                pokeList.innerHTML = newHtml;   
        });
    });
}


loadPokemonItens(offset, limit)

loadMoreBtn.addEventListener('click', () => {
    offset += limit

    const qntdRecordNextPage = offset + limit;

    if (qntdRecordNextPage >= maxRecords) {
        const newLimit = maxRecords - offset;
        loadPokemonItens(offset, newLimit)

        loadMoreBtn.parentElement.removeChild(loadMoreBtn)
    } else {
        
        loadPokemonItens(offset, limit)
    }


})


// Pesquisa de pokemons na página
function elementsFilter() {
    let input = document.getElementById('input');
    let filter = input.value.toUpperCase();
    let list = document.getElementById('poke-list');
    let elements = list.getElementsByTagName('li');
    
        for (let i = 0; i < elements.length; i++) {
        let textElement = elements[i].textContent || elements[i].innerText;
        if (textElement.toUpperCase().indexOf(filter) > -1) {
            elements[i].style.display = '';
        } else {
            elements[i].style.display = 'none';
        }
        }
}