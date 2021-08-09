fetch('https://pokeapi.co/api/v2/pokemon?limit=151')
.then(response => response.json())
.then(allPokemons => {

    var kantoPokemons = []

    allPokemons.results.map((val) => {
        kantoPokemons.push({name: val.name})

        fetch(val.url)
        .then(response => response.json())
        .then(pokemonSingle => {
            
            var pkName = pokemonSingle.name
            var pkDefault = pokemonSingle.sprites.front_default
         
            document.getElementById('pokemon-card').innerHTML += `

            <div class="pokemon-single">
                <a href="#header">
                    <img src="${pkDefault}">
                    <span class="pokemon-name">${pkName}</span>
                </a>
            </div>

            `
            var pokemonSingle = document.querySelectorAll('.pokemon-single')
            var getName = document.querySelectorAll('.pokemon-name')

            for(let i = 0; i < pokemonSingle.length && getName; i++) {
                pokemonSingle[i].addEventListener('click', () => {

                    fetch('https://pokeapi.co/api/v2/pokemon/'+ getName[i].textContent)
                    .then(response => response.json())
                    .then(pokemonInfo => {

                        document.getElementById('pokedex-content').classList.add('resizer')
                        document.getElementById('pokedex-content').classList.remove('full-content')
                        
                        var infoSprite = pokemonInfo.sprites.other.dream_world.front_default
                        var infoName = pokemonInfo.name
                        var infoType1 = pokemonInfo.types[0].type.name
                        var infoType2 = pokemonInfo.types[1] ? 'type 2: ' + pokemonInfo.types[1].type.name : ''
                        
                        document.getElementById('pokemon-content').innerHTML = `

                        <div id="pokemon-info">
                            <div class="title" id="info-title">
                                 <h2>Pokémon Info</h2>
                            </div>
                            <div id="details">
                                <div id="art">
                                    <img src="${infoSprite}">
                                </div>
                                <div id="name">
                                    <span>${infoName}</span>
                                </div>
                                <div id="type">
                                    <span>type 1: ${infoType1}</span>
                                    <br>
                                    <span>${infoType2}</span>
                                </div>                
                                <div id="move">
                                    <h2 class="title">Moves</h2>
                                    <div id="move-box">
                                    </div>
                                </div>
                            </div>
                         </div>

                   `

                        for (let i = 0; i < pokemonInfo.moves.length; i++) {
                            
                            var moveName = 'name: ' + pokemonInfo.moves[i].move.name
                            var moveMethod = 'method: ' + pokemonInfo.moves[i].version_group_details[0].move_learn_method.name
                            var moveLevel = ' level: ' + pokemonInfo.moves[i].version_group_details[0].level_learned_at
                            
                            document.getElementById('move-box').innerHTML += `
                            
                            <div class="move-single">
                                <span>${moveName}</span><br>
                                <span>${moveMethod}</span><br>
                                <span>${moveLevel}</span>
                            </div>
                            
                            `
                        }
                    })
                })
            }      
        })        
    })
})