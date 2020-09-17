const fetchFromApi = require('./fetchFromApi')

const cinemaworld = {
    movies: new URL(`${CINEMAWORLD_API}/movies`),
}

async function getCinemaworldMovies() {
    const response = await fetchFromApi(cinemaworld.movies)
    return response.Movies || []
}

module.exports = { getCinemaworldMovies }
