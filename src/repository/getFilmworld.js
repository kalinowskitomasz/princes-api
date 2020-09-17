const fetchFromApi = require('./fetchFromApi')

const filmworld = {
    movies: new URL(`${FILMWORLD_API}/movies`),
}

async function getFilmworldMovies() {
    return fetchFromApi(filmworld.movies)
}

module.exports = { getFilmworldMovies }
