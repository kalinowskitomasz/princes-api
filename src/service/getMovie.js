import { StatusCodes } from 'http-status-codes'

import { getCinemaworldMovie } from '../repository/cinemaworld'
import { getFilmworldMovie } from '../repository/filmworld'
import HTTPError from '../lib/HTTPError'

const cinemaworldId = id => `cw${id.slice(2)}`
const filmworldId = id => `fw${id.slice(2)}`

function mergeMovieData(movie, id) {
    let ret = Object.create(null)
    let prices = Object.create(null)
    movie.forEach(movie => {
        ret = Object.assign(ret, movie.data)
        prices[movie.data.Source] = movie.data.Price
    })

    ret.Price = prices
    ret.ID = id
    delete ret.Source
    return ret
}

export default async function getMovie(id) {
    const movieResponse = await Promise.all([
        getCinemaworldMovie(cinemaworldId(id)),
        getFilmworldMovie(filmworldId(id)),
    ])

    // if at least one of the sources returns
    // response still could be sent
    let success = false
    movieResponse.forEach(response => {
        success = success || !response.error
    })

    if (!success)
        throw new HTTPError(`getMovie/${id} failed`, StatusCodes.BAD_GATEWAY)

    const movieData = mergeMovieData(movieResponse, id)
    return movieData
}
