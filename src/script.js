//let fetch =  require('isomorphic-fetch')


async function firstFetch(movieId){
    try{
        const responce = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=17053cd19c5a7b4aa0ca53a9b1d6da35`)
        const data = await responce.json()
        makingCards(data)
    }catch(e){
        return `${e}`
    }
}


console.log(a)

function makingCards(){
    //create the elements wihin the card
    //add the 
}