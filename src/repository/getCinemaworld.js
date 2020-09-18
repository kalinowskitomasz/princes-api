import fetchFromApi from './fetchFromApi'
import { logError } from '../lib/logger'

const cinemaworld = {
    movies: new URL(`${CINEMAWORLD_API}/movies`),
}

export async function getCinemaworldMovies() {
    try {
        const response = await fetchFromApi(cinemaworld.movies)
        return { error: null, data: response.Movies || [] }
    } catch (err) {
        logError('failed to fetch filmworld movies')
        return { error: err, data: [] }
    }
}
