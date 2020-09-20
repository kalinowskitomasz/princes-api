import { Router } from 'tiny-request-router'
import { StatusCodes, getReasonPhrase } from 'http-status-codes'

import allMoviesHandler from './controller/allMoviesHandler'
import movieHandler from './controller/movieHandler'
import cacheResponse from './lib/cacheResponse'
import HTTPError from './lib/HTTPError'
import { logError } from './lib/logger'
import responseBase from './lib/responseBase'

const router = new Router()

function ErrorResponse(statusCode) {
    return new Response(
        getReasonPhrase(statusCode),
        { status: statusCode },
        responseBase
    )
}

router.get('/movies', async (params, event) =>
    cacheResponse(allMoviesHandler)(params, event)
)

router.get('/movie/:id', async (params, event) =>
    cacheResponse(movieHandler)(params, event)
)

async function handleRequest(event) {
    try {
        const request = event.request
        const { pathname } = new URL(request.url)
        const match = router.match(request.method, pathname)
        if (match) {
            return await match.handler(match.params, event)
        } else {
            return ErrorResponse(StatusCodes.NOT_FOUND)
        }
    } catch (err) {
        logError(JSON.stringify(event.request.cf), JSON.stringify(err))
        if (err instanceof HTTPError) {
            return ErrorResponse(err.status)
        }

        return ErrorResponse(StatusCodes.INTERNAL_SERVER_ERROR)
    }
}

addEventListener('fetch', event => {
    event.respondWith(handleRequest(event))
})
