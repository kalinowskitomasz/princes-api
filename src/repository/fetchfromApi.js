import { StatusCodes } from 'http-status-codes'

import { logError } from '../lib/logger'
import HTTPError from '../lib/HTTPError'

const numberOfRetries = 3

export async function fetchRetry(url, options = {}, retries) {
    let res
    try {
        res = await fetch(url, options)
    } catch (err) {
        if (retries > 0) {
            logError(`Request failed: ${url}. Retry.`)
            logError(err)
            return fetchRetry(url, options, retries - 1)
        }
        throw new HTTPError(err, StatusCodes.BAD_GATEWAY)
    }
    if (res.ok) {
        throw new HTTPError('aaa', 403)
        // If fails on parsing just let the error bubble up to 500
        return res.json()
    }
    if (retries > 0) {
        logError(`Request failed: ${url} returned ${res.status}. Retry.`)
        return fetchRetry(url, options, retries - 1)
    }
    logError(
        `Request failed: ${url} returned ${res.status} after ${numberOfRetries} retries`
    )
    throw new HTTPError('request failed', res.status)
}

export default async function fetchFromApi(url) {
    return fetchRetry(
        url,
        {
            method: 'GET',
            headers: { 'x-api-key': API_KEY, Accept: 'application/json' },
        },
        numberOfRetries
    )
}
