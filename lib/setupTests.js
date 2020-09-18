import fetch, { Request, Response } from 'node-fetch'
import { log, logError } from '../src/lib/logger'
jest.mock('../src/lib/logger')
global.beforeEach(() => {
    log.mockReset()
    logError.mockReset()
    caches.default.match.mockReset()
    caches.default.put.mockReset()
})
// use node-fetch to fake the cloudworkers fetch environment
global.fetch = fetch
global.Request = Request
global.Response = Response
global.caches = {
    default: {
        match: jest.fn(),
        put: jest.fn(),
    },
}
