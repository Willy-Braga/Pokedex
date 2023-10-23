const pokeList = document.getElementById('poke-list');
const description = document.querySelectorAll('#description');
const maxRecords = 1017;
const limit = 2;
let offset = 0;

// Renderizando os dados do pokemon e imprimindo na tela
function loadPokemonItens(offset, limit) {

    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
    
        // Metodo simplificado
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

            <p class="descricao" id="description">${pokemon.description}</p>
        </li>`
        ).join('');

        //Substituindo o HTML
        pokeList.innerHTML += newHtml;

        // Adicionando um evento de submit ao form
        form.addEventListener('submit', async (event, pokemons) => {
            event.preventDefault();

            const searchPokemon = input.value;

            // Obtém o Pokémon do retorno da API
            const pokemon = await pokeApi.searchPokemon(searchPokemon.toLowerCase());

            // Verifica se o Pokémon existe
            if (pokemon) {
                console.log(pokemon);
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
                    </li>`
                ;

                // Concatena o HTML do Pokémon pesquisado ao HTML existente
                newHtml = pokemonHtml;

                // Substitui o HTML
                pokeList.innerHTML = newHtml;
            } else {
                // Retorna um erro
                console.log('O Pokémon não existe.');
            };

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





// Pesquisa de pokemons
// function elementsFilter() {
//     let input = document.getElementById('input');
//     let filter = input.value.toUpperCase();
//     let list = document.getElementById('poke-list');
//     let elements = list.getElementsByTagName('li');
    
//         for (let i = 0; i < elements.length; i++) {
//         let textElement = elements[i].textContent || elements[i].innerText;
//         if (textElement.toUpperCase().indexOf(filter) > -1) {
//             elements[i].style.display = '';
//         } else {
//             elements[i].style.display = 'none';
//         }
//         }
// }

