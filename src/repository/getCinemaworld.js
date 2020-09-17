const fetchFromApi = require('./fetchFromApi')

const cinemaworld = {
    movies: new URL(`${CINEMAWORLD_API}/movies`),
}

async function getCinemaworldMovies() {
    return fetchFromApi(cinemaworld.movies)
}

module.exports = { getCinemaworldMovies }
