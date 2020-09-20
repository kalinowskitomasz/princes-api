import getAllMovies from '../service/getAllMovies'
import responseBase from '../lib/responseBase'

export default async function allMoviesHandler(params, event) {
    const allMovies = await getAllMovies()

    return new Response(JSON.stringify(allMovies, null), responseBase)
}
