import fetchFromApi from './fetchFromApi'
import { logError } from '../lib/logger'

const cinemaworld = {
    movies: `${CINEMAWORLD_API}/movies`,
    movie: `${CINEMAWORLD_API}/movie`,
}

export async function getCinemaworldAllMovies() {
    try {
        const response = await fetchFromApi(new URL(cinemaworld.movies))
        return { error: null, data: response.Movies || [] }
    } catch (err) {
        logError('failed to fetch cinemaworld movies', err)
        return { error: err, data: [] }
    }
}

export async function getCinemaworldMovie(id) {
    try {
        const response = await fetchFromApi(
            new URL(`${cinemaworld.movie}/${id}`)
        )
        return { error: null, data: response }
    } catch (err) {
        logError(`failed to fetch cinemaworld movie ${id}`, err)
        return { error: err, data: {} }
    }
}
