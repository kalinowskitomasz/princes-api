export default function cachedHandler(handler) {
    return async function(params, event) {
        const { request } = event
        const cacheUrl = new URL(request.url)
        const cacheKey = new Request(cacheUrl.toString(), request)
        const cache = caches.default
        let response = await cache.match(cacheKey)
        if (!response) {
            console.log('cache miss')
            response = await handler(params, event)
            response = new Response(response.body, response)
            response.headers.append('Cache-Control', 'max-age=10')
            event.waitUntil(cache.put(cacheKey, response.clone()))
        } else {
            console.log('hit the cache')
        }
        return response
    }
}
