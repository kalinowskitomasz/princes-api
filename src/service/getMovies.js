const { getCinemaworldMovies } = require('../repository/getCinemaworld')
const { getFilmworldMovies } = require('../repository/getFilmworld')

function mergeDataSources(allMovies) {
    const moviesMap = new Map()
    allMovies.forEach(source => {
        source.forEach(movie => {
            const imdbId = `tt${movie.ID.slice(2)}`
            if (!moviesMap.has(imdbId)) {
                moviesMap.set(imdbId, { ...movie, ID: imdbId })
            }
        })
    })
    return [...moviesMap.values()]
}

async function getMovies() {
    const init = {
        headers: { 'content-type': 'application/json;charset=UTF-8' },
    }

    const allMovies = await Promise.all([
        getCinemaworldMovies(),
        getFilmworldMovies(),
    ])

    const response = new Response(
        JSON.stringify(mergeDataSources(allMovies), null, 2),
        init
    )
    return response
}

module.exports = getMovies
