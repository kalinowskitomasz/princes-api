import fetchFromApi from './fetchFromApi'

const cinemaworld = {
    movies: new URL(`${CINEMAWORLD_API}/movies`),
}

export async function getCinemaworldMovies() {
    const response = await fetchFromApi(cinemaworld.movies)
    return response.Movies || []
}
