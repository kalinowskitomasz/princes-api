async function fetchFromApi(url) {
    // TODO: add retry logic
    const response = await fetch(url, {
        method: 'GET',
        headers: { 'x-api-key': API_KEY, Accept: 'application/json' },
    })

    return response.json()
}

module.exports = fetchFromApi
