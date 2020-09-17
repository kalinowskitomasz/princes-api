const { Router } = require('tiny-request-router')
const moviesHandler = require('./controller/moviesHandler')
const cacheResponse = require('./cacheResponse')

const router = new Router()

router.get('/movies', async (params, event) =>
    cacheResponse(moviesHandler)(params, event)
)

async function handleRequest(event) {
    const request = event.request
    const { pathname } = new URL(request.url)
    const match = router.match(request.method, pathname)
    console.log('bbb')
    if (match) {
        return match.handler(match.params, event)
    } else {
        return new Response('Not found', { status: 404 })
    }
}

addEventListener('fetch', event => {
    event.respondWith(handleRequest(event))
})
