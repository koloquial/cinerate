export function getMovieInfo(movieID){
    console.log('movie id', movieID)
    const API = process.env.REACT_APP_OMDB;

    return fetch(`https://www.omdbapi.com/?i=tt3896198&apikey=${API}&t="${movieID}"`)
        .then(response => response.json())
        .catch(error => console.error(error));
}