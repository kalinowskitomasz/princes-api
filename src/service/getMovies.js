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
    const allMovies = await Promise.all([
        getCinemaworldMovies(),
        getFilmworldMovies(),
    ])

    return mergeDataSources(allMovies)
}

module.exports = getMovies
