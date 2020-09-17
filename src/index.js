const Router = require('./router')
const MoviesHandler = require('./moviesHandler')

addEventListener('fetch', event => {
    event.respondWith(handleRequest(event.request))
})

async function handleCache(request) {
    console.log('aaaaa')
    console.log(Object.keys(request))
    console.log(request.url)
    const cacheUrl = new URL(request.url)
    // Hostname for a different zone
    cacheUrl.hostname = FILMWORLD_API + '/movies'
    const cacheKey = new Request(cacheUrl.toString(), request)
    const cache = caches.default
    // Get this request from this zone's cache
    let response = await cache.match(cacheKey)
    if (!response) {
        //If not in cache, get it from origin
        response = await fetch(
            'https://challenge.lexicondigital.com.au/api/filmworld/movies',
            {
                method: 'GET',
                headers: { 'x-api-key': API_KEY },
            }
        )
        // Must use Response constructor to inherit all of response'sł fields
        response = new Response(response.body, response)
        // Cache API respects Cache-Control headers. Setting max-age to 10
        // will limit the response to be in cache for 10 seconds max
        response.headers.append('Cache-Control', 'max-age=10')
        // Store the fetched response as cacheKey
        // Use waitUntil so computational expensive tasks don"t delay the response
        event.waitUntil(cache.put(cacheKey, response.clone()))
    }
    return response
}

function handler(request) {
    const init = {
        headers: { 'content-type': 'application/json' },
    }
    const body = JSON.stringify({ some: 'json' })
    return new Response(body, init)
}

async function handleRequest(request) {
    const r = new Router()
    r.get('.*/movies', request => handleCache(request))
    r.get('.*/movie/*', request => handler(request))

    const resp = await r.route(request)
    return resp
}
