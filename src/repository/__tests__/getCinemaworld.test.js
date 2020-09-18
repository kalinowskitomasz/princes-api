import { getCinemaworldMovies } from '../getCinemaworld'
import fetchFromApi from '../fetchFromApi'
import HTTPError from '../../lib/HTTPError'
jest.mock('../fetchFromApi')

describe('getCinemaworld', () => {
    beforeEach(() => {
        fetchFromApi.mockReset()
    })

    test('correct response', async () => {
        fetchFromApi.mockResolvedValue({ Movies: ['aaa'] })

        await expect(getCinemaworldMovies()).resolves.toEqual({
            error: null,
            data: ['aaa'],
        })
    })

    test('response missing Movies falls back to an empty array', async () => {
        fetchFromApi.mockResolvedValue({})

        await expect(getCinemaworldMovies()).resolves.toEqual({
            error: null,
            data: [],
        })
    })

    test('failing response returns an error', async () => {
        fetchFromApi.mockRejectedValue(new HTTPError('error', 500))

        await expect(getCinemaworldMovies()).resolves.toEqual({
            error: new HTTPError('error', 500),
            data: [],
        })
    })
})
