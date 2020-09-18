import { StatusCodes } from 'http-status-codes'

import HTTPError from '../lib/HTTPError'
import { getCinemaworldAllMovies } from '../repository/cinemaworld'
import { getFilmworldAllMovies } from '../repository/filmworld'

function mergeDataSources(allMovies) {
    const moviesMap = new Map()
    allMovies.forEach(source => {
        source.data.forEach(movie => {
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

export default async function getAllMovies() {
    const allMovies = await Promise.all([
        getCinemaworldAllMovies(),
        getFilmworldAllMovies(),
    ])

    // if at least one of the sources returns
    // response still could be sent
    let success = false
    allMovies.forEach(response => {
        success = success || !response.error
    })

    if (!success)
        throw new HTTPError('getAllMovies failed', StatusCodes.BAD_GATEWAY)

    const moviesData = mergeDataSources(allMovies)

    if (moviesData.length === 0)
        throw new HTTPError('no movies found', StatusCodes.NOT_FOUND)

    return moviesData
}
