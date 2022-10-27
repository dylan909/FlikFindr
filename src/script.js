//let fetch =  require('isomorphic-fetch')
const cardEntry = document.querySelector('.cardSection')
const hitsPerPage = document.querySelector('#sort') 
const cardSelection = document.querySelector(".cardSection")

async function fetchAMovie(pages){
    try{
        const responce = await fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=17053cd19c5a7b4aa0ca53a9b1d6da35&page=${pages}`)
        const data = await responce.json()
        //let img = fetchMoviePoster(data.poster_path)
        data.results.forEach(element => {
            makingCards(element)
        });
        console.log(data)
        //makingCards(data)
    }catch(e){
        return `${e}`
    }
}


function makingCards(data){
    //create the elements wihin the card

    let div = document.createElement('article')
    let img = document.createElement('img')
    let title = document.createElement('h1')

    img.setAttribute('src', `https://image.tmdb.org/t/p/w200/${data.poster_path}`)

    div.classList.add(`classList${data.id}`)
    div.classList.add("card")

    title.innerHTML = data.original_title

    div.append(img, title)

    cardEntry.append(div)

}


function generateItemsReturned(value){
    
    let num = Number(value) / 20
    console.log(num)
    for (let i = 1; i <= num; i++){
        fetchAMovie(i)
        //console.log(fetchAMovie(i))
    }

}

generateItemsReturned(20)

hitsPerPage.addEventListener('input', (event) => {
    console.log(event.target.value)
    //cardSelection.remove()
    while (cardSelection.firstChild) {
        cardSelection.removeChild(cardSelection.firstChild);
    }
    generateItemsReturned(event.target.value)
})

