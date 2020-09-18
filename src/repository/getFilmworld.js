import fetchFromApi from './fetchFromApi'

const filmworld = {
    movies: new URL(`${FILMWORLD_API}/movies`),
}

export async function getFilmworldMovies() {
    const response = await fetchFromApi(filmworld.movies)
    return response.Movies || []
}
