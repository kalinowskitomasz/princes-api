import { getCinemaworldAllMovies, getCinemaworldMovie } from '../getCinemaworld'
import fetchFromApi from '../fetchFromApi'
import HTTPError from '../../lib/HTTPError'
import { StatusCodes } from 'http-status-codes'
jest.mock('../fetchFromApi')

describe('getCinemaworld', () => {
    beforeEach(() => {
        fetchFromApi.mockReset()
    })

    test('correct response', async () => {
        fetchFromApi.mockResolvedValue({ Movies: ['aaa'] })

        await expect(getCinemaworldAllMovies()).resolves.toEqual({
            error: null,
            data: ['aaa'],
        })
    })

    test('response missing Movies falls back to an empty array', async () => {
        fetchFromApi.mockResolvedValue({})

        await expect(getCinemaworldAllMovies()).resolves.toEqual({
            error: null,
            data: [],
        })
    })

    test('failing response returns an error', async () => {
        fetchFromApi.mockRejectedValue(new HTTPError('error', 500))

        await expect(getCinemaworldAllMovies()).resolves.toEqual({
            error: new HTTPError('error', 500),
            data: [],
        })
    })
})

describe('getCinemaworldMovie', () => {
    test('returns valid response', async () => {
        const data = {
            ID: 'cw2488496',
            Title: 'Star Wars: Episode VII - The Force Awakens',
            Price: 25,
        }

        fetchFromApi.mockResolverValue(data)

        await expect(getCinemaworldMovie('cw2488496')).resolves.toEqual({
            error: null,
            data,
        })
    })

    test('returns error', async () => {
        fetchFromApi.mockRejectedValue(
            new HTTPError('error', StatusCodes.NOT_FOUND)
        )

        await expect(getCinemaworldMovie('cw2488496')).resolves.toEqual({
            error: new HTTPError('error', StatusCodes.NOT_FOUND),
            data: {},
        })
    })
})
