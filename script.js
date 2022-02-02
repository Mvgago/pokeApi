window.onload = () => {
    let printToDom = (data) => {
        let divContainer = document.querySelector("#container")
        let obj = {}
        obj.id = data.id
        obj.name = data.name
        obj.types = data.types.map(item => item.type.name).join(", ")
        obj.img = data.sprites.front_default
        let pokemonDiv = document.createElement("div")
        pokemonDiv.classList.add("poke_card")
        let innerTags = `<h2>Name: ${obj.name}</h2>
                         <p>Id: ${obj.id}</p>
                         <h3>Type: ${obj.types}</h3>
                         <img src="${obj.img}"/>`
        pokemonDiv.innerHTML = innerTags
        divContainer.appendChild(pokemonDiv)
}

   let getPokemons = () => {
    let arrayPromises = []
    for(let i = 1; i <= 150; i++) {
        const URL = `https://pokeapi.co/api/v2/pokemon/${i}`
        arrayPromises.push(fetch(URL).then(res => res.json()))
    }

    Promise.all(arrayPromises).then((datos) => {
    console.log(datos)
    for(let pkm of datos) {
        printToDom(pkm)
    }

    }).catch((error) => {
    console.log("No se ha podido cargar debido a un error", error)
    })
 
   }    


   getPokemons()
}