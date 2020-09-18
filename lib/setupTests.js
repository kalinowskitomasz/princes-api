import fetch from 'node-fetch'
import { log, logError } from '../src/lib/logger'
jest.mock('../src/lib/logger')
global.beforeEach(() => {
    log.mockReset()
    logError.mockReset()
})
// use node-fetch to fake the cloudworkers fetch
global.fetch = fetch
