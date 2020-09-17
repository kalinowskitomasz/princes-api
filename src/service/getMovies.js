const { getCinemaworldMovies } = require('../repository/getCinemaworld')
const { getFilmworldMovies } = require('../repository/getFilmworld')

async function getMovies() {
    const init = {
        headers: { 'content-type': 'application/json;charset=UTF-8' },
    }

    const [cinemaworldMovies, filmworldMovies] = await Promise.all([
        getCinemaworldMovies(),
        getFilmworldMovies(),
    ])
    const response = new Response(
        JSON.stringify({ cinemaworldMovies, filmworldMovies }, null, 2),
        init
    )
    return response
}

module.exports = getMovies
