import getAllMovies from '../service/getAllMovies'

export default async function allMoviesHandler(params, event) {
    const init = {
        headers: { 'content-type': 'application/json;charset=UTF-8' },
    }

    const allMovies = await getAllMovies()

    return new Response(JSON.stringify(allMovies, null), init)
}
