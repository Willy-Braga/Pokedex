const pokeList = document.getElementById('poke-list');
const form = document.getElementById('form');
const input = document.getElementById('input');
const description = document.querySelectorAll('#description');
const maxRecords = 1017;
const limit = 20;
let offset = 0;



// Renderizando os dados do pokemon e imprimindo na tela
function loadPokemonItens(offset, limit) {

    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
    
        // Metodo simplificado
        const newHtml = pokemons.map((pokemon) =>`
        <li class="cartao-pokemon">
        
            <div class="informacoes">
                <span>${pokemon.name}</span>
                <span class="poke-number">#${pokemon.number}</span>
            </div>

            <img src="${pokemon.photo}" alt="${pokemon.name}" class="gif">

            <ul class="types">
                ${pokemon.types.map((type) => `<li class="type ${type}"><img src="src/images/poke-elements/${type}.png" alt="${pokemon.name}" class="poke-img"></li>`).join('')}
            </ul>

            <p class="descricao" id="description">${pokemon.description}</p>
        </li>`
        ).join('');



        //Substituindo o HTML
        pokeList.innerHTML += newHtml; 
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

