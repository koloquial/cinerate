export function searchMovieTitle(title){
    const API = process.env.REACT_APP_OMDB;

    return fetch(`https://www.omdbapi.com/?i=tt3896198&apikey=${API}&s=${title}`)
        .then(response => response.json())
        .catch(error => console.error(error));
}