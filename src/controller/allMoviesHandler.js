import getAllMovies from '../service/getAllMovies'

export default async function allMoviesHandler(params, event) {
    const allMovies = await getAllMovies()

    return new Response(JSON.stringify(allMovies, null), {
        headers: { 'content-type': 'application/json;charset=UTF-8' },
    })
}
