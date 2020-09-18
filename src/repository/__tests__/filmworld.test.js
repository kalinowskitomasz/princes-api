import { StatusCodes } from 'http-status-codes'

import { getFilmworldAllMovies, getFilmworldMovie } from '../filmworld'
import fetchFromApi from '../fetchFromApi'
import HTTPError from '../../lib/HTTPError'
jest.mock('../fetchFromApi')

describe('getFilmworldAllMovies', () => {
    beforeEach(() => {
        fetchFromApi.mockReset()
    })

    test('correct response', async () => {
        fetchFromApi.mockResolvedValue({ Movies: ['aaa'] })

        await expect(getFilmworldAllMovies()).resolves.toEqual({
            error: null,
            data: ['aaa'],
        })
    })

    test('response missing Movies falls back to an empty array', async () => {
        fetchFromApi.mockResolvedValue({})

        await expect(getFilmworldAllMovies()).resolves.toEqual({
            error: null,
            data: [],
        })
    })

    test('failing response returns an error', async () => {
        fetchFromApi.mockRejectedValue(new HTTPError('error', 500))

        await expect(getFilmworldAllMovies()).resolves.toEqual({
            error: new HTTPError('error', 500),
            data: [],
        })
    })
})

describe('getFilmworldMovie', () => {
    beforeEach(() => {
        fetchFromApi.mockReset()
    })

    test('returns valid response', async () => {
        const data = fetchFromApi.mockResolvedValue({
            ID: 'fw2488496',
            Title: 'Star Wars: Episode VII - The Force Awakens',
            Price: 25,
        })

        await expect(getFilmworldMovie('fw2488496')).resolves.toEqual({
            error: null,
            data: {
                ID: 'fw2488496',
                Title: 'Star Wars: Episode VII - The Force Awakens',
                Price: 25,
                Source: 'Film World',
            },
        })
    })

    test('returns error', async () => {
        fetchFromApi.mockRejectedValue(
            new HTTPError('error', StatusCodes.NOT_FOUND)
        )

        await expect(getFilmworldMovie('fw2488496')).resolves.toEqual({
            error: new HTTPError('error', StatusCodes.NOT_FOUND),
            data: {},
        })
    })
})
