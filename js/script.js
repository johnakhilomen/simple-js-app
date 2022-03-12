//Pokemon Deck Build

//IFFE Function Style
let pokemonRepository = (function () {

    let pokemonList = []
    let pokedeckApi = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

    function getAll(){
        return pokemonList
    }  
    
    function add(newItem) {
        if(typeof(newItem) !== typeof(pokemonList)){
            console.log("Wrong Type")
        }else{
            pokemonList.push(newItem)
        }
    }

    function addListItem(pokemon) {
        let displayBlock = document.querySelector('.list-group')
        let listItem = document.createElement('li')
        let button = document.createElement('button')
        button.innerText = pokemon.name
        listItem.classList.add('btn')
        button.classList.add("w-100")
        button.classList.add('bg-info')
        button.classList.add('p-2')
        button.classList.add('display-4')
        button.classList.add('text-capitalize')
        listItem.classList.add('group-list-item');
        listItem.appendChild(button)
        displayBlock.appendChild(listItem)
        button.addEventListener("click", function(event) {
            event.preventDefault()
            DisplayModal(pokemon);
        });
    }

    function showLoadingMessage() {
        let displayBlock = document.querySelector('.list-group')
        let messageStart = document.createElement('h1')
        messageStart.innerText = "PokeDeck API Running"
        messageStart.classList.add('under_H1')
        displayBlock.appendChild(messageStart)
    }

    function hideLoadingMessage() {
        let hideMessage = document.querySelector('h1')
        hideMessage.remove('under_h1')
    }
    

    function loadList() {
        showLoadingMessage()
        return fetch(pokedeckApi).then(function (response) {
          return response.json();
        }).then(function (json) {
          json.results.forEach(function (item) {
            let pokemon = {
              name: item.name,
              detailsUrl: item.url
            };
            add(pokemon);
            console.log(pokemon);
          });
        }).catch(function (e) {
            hideLoadingMessage()
          console.error(e);
        })
    }

    function loadDetails(item) {
        showLoadingMessage()
        let url = item.detailsUrl;
        return fetch(url).then(function (response) {
          return response.json();
        }).then(function (details) {
            hideLoadingMessage()
          // Now we add the details to the item
          item.imageUrl = details.sprites.front_default;
          item.height = details.height;
          item.types = details.types;
        }).catch(function (e) {
            hideLoadingMessage()
          console.error(e);
        });
    }

    function DisplayModal(item) {
      loadDetails(item).then(function () {
        console.log(item)
        showDetails(item);
      });
    }


    function showDetails(item) {

          let modalTitle = $('.modal-title'); 
          let modalBody = $('.modal-body'); 
  

          let pokeName = $('<h2>' + item.name + '</h2>');

          let pokeHeight = $('<p>' + 'Height: ' + item.height + '</p>');

          let pokeImage = $('<img class=\'pokemon-modal-image\'>');
          pokeImage.attr('src', item.imageUrl); 

          modalTitle.empty(); 
          modalBody.empty(); 

          modalTitle.append(pokeName); 
          modalBody.append(pokeImage); 
          modalBody.append(pokeHeight); 
    }

    return {
        add: add,
        getAll: getAll,
        addListItem: addListItem,
        loadList: loadList,
        loadDetails: loadDetails,
        showDetails: showDetails,
        DisplayModal: DisplayModal
    };
})();

pokemonRepository.add({name: 'pikachu', height: 0.9} );
console.log("Seperated")
pokemonRepository.loadList().then(function () {
    pokemonRepository.getAll().forEach(function (pokemon) {
      pokemonRepository.addListItem(pokemon);
    });
});

  



