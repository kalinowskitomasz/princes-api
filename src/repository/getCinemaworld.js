import fetchFromApi from './fetchFromApi'
import { logError } from '../lib/logger'

const cinemaworld = {
    movies: new URL(`${CINEMAWORLD_API}/movies`),
}

export async function getCinemaworldAllMovies() {
    try {
        const response = await fetchFromApi(cinemaworld.movies)
        return { error: null, data: response.Movies || [] }
    } catch (err) {
        logError('failed to fetch cinemaworld movies', err)
        return { error: err, data: [] }
    }
}

export async function getCinemaworldMovie() {}
