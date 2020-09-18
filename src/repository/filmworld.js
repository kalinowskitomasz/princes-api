import fetchFromApi from './fetchFromApi'
import { logError } from '../lib/logger'

const filmworld = {
    movies: `${FILMWORLD_API}/movies`,
    movie: `${FILMWORLD_API}/movie`,
}

export async function getFilmworldAllMovies() {
    try {
        const response = await fetchFromApi(new URL(filmworld.movies))
        return { error: null, data: response.Movies || [] }
    } catch (err) {
        logError('failed to fetch filmworld movies', err)
        return { error: err, data: [] }
    }
}

export async function getFilmworldMovie(id) {
    try {
        const response = await fetchFromApi(new URL(`${filmworld.movie}/${id}`))
        response.Source = 'Film World'
        return { error: null, data: response }
    } catch (err) {
        logError(`failed to fetch filmworld movie ${id}`, err)
        return { error: err, data: {} }
    }
}
