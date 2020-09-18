import { StatusCodes } from 'http-status-codes'

import { getCinemaworldAllMovies, getCinemaworldMovie } from '../cinemaworld'
import fetchFromApi from '../fetchFromApi'
import HTTPError from '../../lib/HTTPError'

jest.mock('../fetchFromApi')

describe('getCinemaworldAllMovies', () => {
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
    beforeEach(() => {
        fetchFromApi.mockReset()
    })

    test('returns valid response', async () => {
        const data = {
            ID: 'cw2488496',
            Title: 'Star Wars: Episode VII - The Force Awakens',
            Price: 25,
        }

        fetchFromApi.mockResolvedValue({
            ID: 'cw2488496',
            Title: 'Star Wars: Episode VII - The Force Awakens',
            Price: 25,
        })

        await expect(getCinemaworldMovie('cw2488496')).resolves.toEqual({
            error: null,
            data: {
                ID: 'cw2488496',
                Title: 'Star Wars: Episode VII - The Force Awakens',
                Price: 25,
            },
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
