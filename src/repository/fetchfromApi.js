const numberOfRetries = 3

async function fetchRetry(url, options = {}, retries) {
    let res
    try {
        res = await fetch(url, options)
    } catch (err) {
        if (retries > 0) {
            console.error(`Request failed: ${url}. Retry.`)
            console.error(err)
            return fetchRetry(url, options, retries - 1)
        }
        throw new Error(err)
    }
    if (res.ok) {
        return res.json()
    }
    if (retries > 0) {
        console.error(`Request failed: ${url} returned ${res.status}. Retry.`)
        return fetchRetry(url, options, retries - 1)
    }
    throw new Error(res.status)
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
