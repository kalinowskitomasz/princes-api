import fetchFromApi from './fetchFromApi'
import { logError } from '../lib/logger'

const filmworld = {
    movies: new URL(`${FILMWORLD_API}/movies`),
}

export async function getFilmworldMovies() {
    try {
        const response = await fetchFromApi(filmworld.movies)
        return { error: null, data: response.Movies || [] }
    } catch (err) {
        logError('failed to fetch filmworld movies')
        return { error: err, data: [] }
    }
}
