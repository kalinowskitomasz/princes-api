import { log } from './logger'
const responseCacheTtl = 10 * 60 // ten minutes

export default function cacheResponse(handler) {
    return async function(params, event) {
        const { request } = event
        const cacheUrl = new URL(request.url)
        const cacheKey = new Request(cacheUrl.toString(), request)
        const cache = caches.default
        let response = await cache.match(cacheKey)
        if (!response) {
            log(`${request.url} cache miss`)
            response = await handler(params, event)
            response = new Response(response.body, response)

            // Cache Control header is used for workers
            // internal cache
            response.headers.append(
                'Cache-Control',
                `max-age=${responseCacheTtl}`
            )
            event.waitUntil(cache.put(cacheKey, response.clone()))
        } else {
            log(`${request.url} hit the cache`)
        }

        // Strip down no longer needed Cache-Control header
        // to not confuse browser
        response = new Response(response.body, response)
        response.headers.delete('Cache-Control')
        return response
    }
}
