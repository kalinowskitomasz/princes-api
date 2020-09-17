const fetchFromApi = require('./fetchFromApi')

const filmworld = {
    movies: new URL(`${FILMWORLD_API}/movies`),
}

async function getFilmworldMovies() {
    const response = await fetchFromApi(filmworld.movies)
    return response.Movies || []
}

module.exports = { getFilmworldMovies }
