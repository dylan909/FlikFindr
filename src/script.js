//let fetch =  require('isomorphic-fetch')
const cardEntry = document.querySelector('.cardSection')
const hitsPerPage = document.querySelector('#sort') 
const cardSelection = document.querySelector(".cardSection")
const removeableSection = document.querySelector('.removeableSection')

async function fetchAMovie(pages){
    try{
        const responce = await fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=17053cd19c5a7b4aa0ca53a9b1d6da35&page=${pages}`)
        const data = await responce.json()
        data.results.forEach(element => {
            makingCards(element)
        });
    }catch(e){
        return `${e}`
    }
}

async function movieInfo(movieId){
    try{
        const responce = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=17053cd19c5a7b4aa0ca53a9b1d6da35`)
        const data = await responce.json()
        movieDataGenerator(data)
        }catch(e){
            console.log(e)
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

    document.querySelector(`.classList${data.id}`).addEventListener('click', (e) => {
        callForMovieData(data.id)
    })

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


function callForMovieData(movieId){
    movieInfo(movieId)
}

function movieDataGenerator(data){
    console.log(data)


    cardSelection.style.display = 'none'


    //create the elements in the page
    let moreInfo = document.createElement('article')
    let poster = document.createElement('img')
    let title = document.createElement('h1')
    let description = document.createElement('p')
    let button = document.createElement('button')

    moreInfo.classList.add('movieInfoContainer')

    poster.setAttribute('src', `https://image.tmdb.org/t/p/w200/${data.poster_path}`)
    title.innerHTML = data.original_title
    description.innerHTML = data.overview
    button.innerHTML = 'click to get back to other movies'

    console.log(title)

    moreInfo.append(title, poster, description, button)

    console.log(moreInfo)
    console.log(removeableSection)

    removeableSection.append(moreInfo)

    button.addEventListener('click', () => {
        cardSelection.style.display = 'flex'
        moreInfo.style.display = 'none'
    })
}
