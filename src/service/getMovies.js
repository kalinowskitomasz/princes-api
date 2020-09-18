import { getCinemaworldMovies } from '../repository/getCinemaworld'
import { getFilmworldMovies } from '../repository/getFilmworld'

function mergeDataSources(allMovies) {
    const moviesMap = new Map()
    allMovies.forEach(source => {
        source.forEach(movie => {
            // Take advantage of the fact that both services use
            // IMDB id with modified prefix
            // revert it back to original for consistency and data integrity
            const imdbId = `tt${movie.ID.slice(2)}`
            if (!moviesMap.has(imdbId)) {
                moviesMap.set(imdbId, { ...movie, ID: imdbId })
            }
        })
    })
    return [...moviesMap.values()]
}

export default async function getMovies() {
    const allMovies = await Promise.all([
        getCinemaworldMovies(),
        getFilmworldMovies(),
    ])

    return mergeDataSources(allMovies)
}
