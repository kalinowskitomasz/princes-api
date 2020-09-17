const { Router } = require('tiny-request-router')
const getMovies = require('./service/getMovies')

const router = new Router()

router.get('/movies', async (params, event) => {
    console.log('ccc')
    return getMovies()
})

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
