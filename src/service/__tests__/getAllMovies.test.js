import getAllMovies from '../getAllMovies'
import { getCinemaworldAllMovies } from '../../repository/getCinemaworld'
import { getFilmworldAllMovies } from '../../repository/getFilmworld'
import cinemaworldResponse from './cinemaworldResponse.json'
import filmworldResponse from './filmworldResponse.json'
import HTTPError from '../../lib/HTTPError'

jest.mock('../../repository/getCinemaworld')
jest.mock('../../repository/getFilmworld')

describe('getAllMovies', () => {
    beforeEach(() => {
        getCinemaworldAllMovies.mockReset()
        getFilmworldAllMovies.mockReset()
    })

    test('correct responses from both sources', async () => {
        getCinemaworldAllMovies.mockResolvedValue(cinemaworldResponse)
        getFilmworldAllMovies.mockResolvedValue(filmworldResponse)

        await expect(getAllMovies()).resolves.toMatchSnapshot()
    })

    test('correct responses from both only once source', async () => {
        getCinemaworldAllMovies.mockResolvedValue(cinemaworldResponse)
        getFilmworldAllMovies.mockResolvedValue({
            error: new HTTPError('error', 500),
            data: [],
        })

        await expect(getAllMovies()).resolves.toMatchSnapshot()
    })

    test('one of the sources returns empty data', async () => {
        getCinemaworldAllMovies.mockResolvedValue(cinemaworldResponse)
        getFilmworldAllMovies.mockResolvedValue({
            error: null,
            data: [],
        })

        await expect(getAllMovies()).resolves.toMatchSnapshot()
    })

    test('both sources fail the request', async () => {
        getCinemaworldAllMovies.mockResolvedValue({
            error: new HTTPError('error', 500),
            data: [],
        })
        getFilmworldAllMovies.mockResolvedValue({
            error: new HTTPError('error', 500),
            data: [],
        })

        await expect(getAllMovies()).rejects.toThrow(HTTPError)
    })

    test('both sources return empty data sets', async () => {
        getCinemaworldAllMovies.mockResolvedValue({
            error: null,
            data: [],
        })
        getFilmworldAllMovies.mockResolvedValue({
            error: null,
            data: [],
        })

        await expect(getAllMovies()).rejects.toThrow(HTTPError)
    })
})
