import getMovies from '../getMovies'
import { getCinemaworldMovies } from '../../repository/getCinemaworld'
import { getFilmworldMovies } from '../../repository/getFilmworld'
import cinemaworldResponse from './cinemaworldResponse.json'
import filmworldResponse from './filmworldResponse.json'
import HTTPError from '../../lib/HTTPError'

jest.mock('../../repository/getCinemaworld')
jest.mock('../../repository/getFilmworld')

describe('getMovies', () => {
    beforeEach(() => {
        getCinemaworldMovies.mockReset()
        getFilmworldMovies.mockReset()
    })

    test('correct responses from both sources', async () => {
        getCinemaworldMovies.mockResolvedValue(cinemaworldResponse)
        getFilmworldMovies.mockResolvedValue(filmworldResponse)

        await expect(getMovies()).resolves.toMatchSnapshot()
    })

    test('correct responses from both only once source', async () => {
        getCinemaworldMovies.mockResolvedValue(cinemaworldResponse)
        getFilmworldMovies.mockResolvedValue({
            error: new HTTPError('error', 500),
            data: [],
        })

        await expect(getMovies()).resolves.toMatchSnapshot()
    })

    test('one of the sources returns empty data', async () => {
        getCinemaworldMovies.mockResolvedValue(cinemaworldResponse)
        getFilmworldMovies.mockResolvedValue({
            error: null,
            data: [],
        })

        await expect(getMovies()).resolves.toMatchSnapshot()
    })

    test('both sources fail the request', async () => {
        getCinemaworldMovies.mockResolvedValue({
            error: new HTTPError('error', 500),
            data: [],
        })
        getFilmworldMovies.mockResolvedValue({
            error: new HTTPError('error', 500),
            data: [],
        })

        await expect(getMovies()).rejects.toThrow(HTTPError)
    })

    test('both sources return empty data sets', async () => {
        getCinemaworldMovies.mockResolvedValue({
            error: null,
            data: [],
        })
        getFilmworldMovies.mockResolvedValue({
            error: null,
            data: [],
        })

        await expect(getMovies()).rejects.toThrow(HTTPError)
    })
})
