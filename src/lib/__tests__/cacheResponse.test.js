import cacheResponse from '../cacheResponse'

describe('cacheResponse', () => {
    test('puts response in cache when empty', async () => {
        const mockEvent = {
            waitUntil: jest.fn(),
            request: new Request('https://test'),
        }

        async function handler(params, event) {
            return new Promise((resolve, reject) =>
                resolve(new Response('aaa', { url: 'https://foo' }))
            )
        }

        const cachedHandler = cacheResponse(handler)

        await expect(cachedHandler(null, mockEvent)).resolves.toEqual(
            new Response('aaa', { url: 'https://foo' })
        )

        expect(caches.default.put).toHaveBeenCalledTimes(1)
        expect(caches.default.match).toHaveBeenCalledTimes(1)
        expect(mockEvent.waitUntil).toHaveBeenCalledTimes(1)
    })

    test('second call returns cached value', async () => {
        const mockEvent = {
            waitUntil: jest.fn(),
            request: new Request('https://test'),
        }

        async function handler(params, event) {
            return new Promise((resolve, reject) =>
                resolve(new Response('aaa', { url: 'https://foo' }))
            )
        }

        const cachedHandler = cacheResponse(handler)

        // call first time, should return from handler
        await expect(cachedHandler(null, mockEvent)).resolves.toEqual(
            new Response('aaa', { url: 'https://foo' })
        )

        // now mock the match function
        caches.default.match.mockResolvedValue(
            new Response('aaa', { url: 'https://foo' })
        )

        // should just take cached one
        await expect(cachedHandler(null, mockEvent)).resolves.toEqual(
            new Response('aaa', { url: 'https://foo' })
        )

        expect(caches.default.put).toHaveBeenCalledTimes(1)
        expect(caches.default.match).toHaveBeenCalledTimes(2)
        expect(mockEvent.waitUntil).toHaveBeenCalledTimes(1)
    })
})
