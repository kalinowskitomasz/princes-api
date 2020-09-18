import { Router } from 'tiny-request-router'
import { StatusCodes, getReasonPhrase } from 'http-status-codes'
import moviesHandler from './controller/moviesHandler'
import cacheResponse from './lib/cacheResponse'
import HTTPError from './lib/HTTPError'
import { logError } from './lib/logger'

const router = new Router()

function ErrorResponse(statusCode) {
    return new Response(getReasonPhrase(statusCode), { status: statusCode })
}

router.get('/movies', async (params, event) =>
    cacheResponse(moviesHandler)(params, event)
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
        if (err instanceof HTTPError) {
            return ErrorResponse(err.status)
        }

        logError(JSON.stringify(event.request.cf), JSON.stringify(err))
        return ErrorResponse(StatusCodes.INTERNAL_SERVER_ERROR)
    }
}

addEventListener('fetch', event => {
    event.respondWith(handleRequest(event))
})
