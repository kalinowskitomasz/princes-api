import { Router } from 'tiny-request-router'
import moviesHandler from './controller/moviesHandler'
import cacheResponse from './cacheResponse'

const router = new Router()

router.get('/movies', async (params, event) => moviesHandler(params, event))

async function handleRequest(event) {
    const request = event.request
    const { pathname } = new URL(request.url)
    const match = router.match(request.method, pathname)
    if (match) {
        return match.handler(match.params, event)
    } else {
        return new Response('Not found', { status: 404 })
    }
}

addEventListener('fetch', event => {
    event.respondWith(handleRequest(event))
})
