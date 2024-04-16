//CODE CHALLENGE
/* 
    I denna utmaning ska ni ge er ut i Pokémon djungeln och söka efter pokémon i eran alldels egna pokédex!
    API som ni använder är detta https://pokeapi.co/docs/v2
    Målet är att ni ska kunna söka efter en valfri pokémon eller på dess ID nummer och dess stats ska visas i articlen. Jag har förberätt HTML,SCSS till er, ni kommer att skapa ref till specifika HTML-elemant och fylla dessa med inforamtion. 

    1.1 Skapa ref till alla HTML-element. dvs knappen,input och alla element där det ska finnas data.
    1.2 När användaren klickar(lyssnare) på sök ska värdet i input sparas i en variabel (Kom ihåg att stänga av det defaulta beteende hos button)
    2. Kan vara bra att göra om värdet till småbokstäver 
    3. Skapa en funktion som ska göra anropet till API ex function getPoke(){}
    4. I knapp lyssnaren anropa funktionen som ska göra anropet till API och skicka med värdet från input ex getPoke(valueInput) 
    5. I API funktionen ta emot värdet som kommer från anropet i kanpplyssnare och lägg det sist i url. https://pokeapi.co/api/v2/pokemon/HÄR SKA VÄRDET in. Förslagsvis så skapar ni en variabel för apiUrl som håller url. 
    6. Använd fetch för att hämta data från API 
    7. Det ni ska göra när ni hämtat data är att hämta ut följande data: 
    height,weight,id, ett move som pokémonen kan göra, bild, HP och vilken type pokémonen är, här vill jag att alla typer ska visas. Det ska alltså vara kodat så att det inte spelar roll om det finns en,två,tre typer. 
    8. Ni får läsa er till i dokumentationen vad värderna betyder ex är höjden i cm,dm eller tum? 
    9. Spara var värde för sig i en variabel ex pokeHeight 
    10. Använd innerHTML för att kunna skriva ut data till dom 
*/
let inputRef = document.querySelector('#search-input');
let btnRef = document.querySelector('#search-btn');
let imgRef = document.querySelector('.img-container');
let nameRef = document.querySelector('#poke-name');
let hpRef = document.querySelector('#hp-span');
let heightRef = document.querySelector('#pokeHeight');
let weightRef = document.querySelector('#pokeWeight');
let idRef = document.querySelector('#pokeId');
let moveRef = document.querySelector('#pokeMove');
let typeRef = document.querySelector('.type-list');

function getPoke(x){
    let apiUrl = `https://pokeapi.co/api/v2/pokemon/${x}`;
    console.log(apiUrl);
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            let pokeHeight = data.height;
            let pokeImage = data.sprites.front_default;
            let pokeName = data.name;
            let pokeHP = data.stats[0].base_stat;
            let pokeWeight = data.weight;
            let pokeID = data.id;
            let pokeMove = data.moves[0].move.name;
            let typeArrayLength = data.types.length; 
            pokeName = pokeName.charAt(0).toUpperCase() + pokeName.slice(1);
            pokeMove = pokeMove.charAt(0).toUpperCase() + pokeMove.slice(1);
            heightRef.innerHTML = `${pokeHeight}dm`;
            imgRef.innerHTML = `<img src="${pokeImage}">`;
            nameRef.innerHTML = `${pokeName}`;
            hpRef.innerHTML = `${pokeHP}`;
            weightRef.innerHTML = `${pokeWeight}g`;
            idRef.innerHTML = `${pokeID}`;
            moveRef.innerHTML = `${pokeMove}`;
            for (let i = 0; i < typeArrayLength; i++) {
                let pokeType = data.types[i].type.name;
                pokeType = pokeType.charAt(0).toUpperCase() + pokeType.slice(1);
                typeRef.innerHTML += `<li class="tag">${pokeType}</li> `;
            }
        })
};
btnRef.addEventListener("click", function(event){
    event.preventDefault()
    let oldTypes = document.querySelectorAll('.tag');
    oldTypes.forEach(element => {
    element.remove();
    });
    let inputData = inputRef.value;
    inputData = inputData.toLowerCase();
    getPoke(inputData);
});

