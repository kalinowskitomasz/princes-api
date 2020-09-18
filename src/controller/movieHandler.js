import { StatusCodes } from 'http-status-codes'

import HTTPError from '../lib/HTTPError'
import getMovie from '../service/getMovie'

// starts with tt prefix, then 7-10 digits
const imdbRegex = /^tt\d{7,10}$/
export function validateId(id) {
    if (typeof id !== 'string') return false

    return imdbRegex.test(id)
}

export default async function movieHandler({ id }, event) {
    if (!validateId(id))
        throw new HTTPError('Incorrect id', StatusCodes.BAD_REQUEST)

    const movieData = await getMovie(id)

    return new Response(JSON.stringify(movieData, null), {
        headers: { 'content-type': 'application/json;charset=UTF-8' },
    })
}
