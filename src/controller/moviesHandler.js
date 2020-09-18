import getMovies from '../service/getMovies'

export default async function moviesHandler(params, event) {
    const init = {
        headers: { 'content-type': 'application/json;charset=UTF-8' },
    }

    const allMovies = await getMovies()

    const response = new Response(JSON.stringify(allMovies, null, 2), init)

    return response
}
