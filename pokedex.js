const dex = document.getElementById("pokemon-card");
const pokemonCount = 386;
var pokedex = {}; // {"name : treecko, "img": url, "type" : ["grass"], "desc" : "...." }

window.onload = async function() {
    // getPokemon(252);
    for (let i = 252; i <= pokemonCount; i++) {
        await getPokemon(i);
        //<div id="252">Treecko</div>
        let pokemon = document.createElement("div");
        pokemon.id = i;
        pokemon.innerText = i.toString() + ". " + pokedex[i]["name"].toUpperCase();
        pokemon.classList.add("pokemon-name");
        pokemon.addEventListener("click", updatePokemon);
        document.getElementById("pokemon-list").append(pokemon);
    }

    document.getElementById("pokemon-description").innerText = pokedex[252]["desc"];
    //console.log(pokedex);
}

async function getPokemon(num) {
    let url = "https://pokeapi.co/api/v2/pokemon/" + num.toString();

    let res = await fetch(url);
    let pokemon = await res.json();
    // console.log(pokemon);

    let pokemonName = pokemon["name"];
    let pokemonType = pokemon["types"];
    let pokemonImg = pokemon["sprites"]["front_shiny"];

    res = await fetch(pokemon["species"]["url"]);
    let pokemonDesc = await res.json();

    // console.log(pokemonDesc);
    pokemonDesc = pokemonDesc["flavor_text_entries"][0]["flavor_text"]

    pokedex[num] = {"name": pokemonName, "img": pokemonImg, "types" : pokemonType, "desc" : pokemonDesc }

}

function updatePokemon() {
    document.getElementById("pokemon-img").src = pokedex[this.id]["img"];

    //clear previous type
    let typesDiv = document.getElementById("pokemon-types");
    while (typesDiv.firstChild) {
        typesDiv.firstChild.remove();
    }

    //update types
    let types = pokedex[this.id]["types"];
    for (let i = 0; i < types.length; i++) {
        let type = document.createElement("span");
        type.innerText = types[i]["type"]["name"].toUpperCase();
        type.classList.add("type-box");
        type.classList.add(types[i]["type"]["name"]); //adds background color and font color
        typesDiv.append(type);
    }

    document.getElementById("pokemon-description").innerText = pokedex[this.id]["desc"];
}


//This section only shows up in the console. I'm just playing with the idea of promises through the pokemon api.
const fetchPromise = fetch("https://pokeapi.co/api/v2/pokemon/regirock");
console.log(fetchPromise);

fetchPromise
    .then((response) => {
        console.log(response);
        console.log(`Response OK? ${response.ok}`);
        console.log(`Response status: ${response.status}`);

        if (!response.ok) {
            throw Error("Bad API request.");
        }

        return response.json();
    })
    .then((json) => {
        console.log(json);
        const name = json.name;
        const weight = json.weight;
        console.log(`The pokemon ${name}, weighs ${weight} hectograms.`);
    })
    .catch((error) => console.log(error));

    console.log("Fetch initiated:");


const fetchPokemon = () => {

        const promises = [];
        //we keep the loop small because the promise.all is making all of the calls run parallel and 150 api calls at one time is a lot. 
        //It's just an example function. It's grabbing bulbasaur, ivysaur, and venusaur without issue.
        //However I wasn't able to get it to display due to some properties of type null issue, but I couldn't figure it out
        for (let i = 1; i <= 3; i++) {
            const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
            promises.push(fetch(url).then((res) => res.json()));
        }
            Promise.all(promises).then((results) => {
                const pokemon = results.map((data) => ({
                    name: data.name,
                    id: data.id,
                    image: data.sprites['front_default'],
                    type: data.types.map((type) => type.type.name).join(', '),
                  }));
                  console.log(pokemon);
            });
    };


fetchPokemon();