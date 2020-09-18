import allMoviesHandler from '../allMoviesHandler'
import getAllMovies from '../../service/getAllMovies'
import HTTPError from '../../lib/HTTPError'
import { StatusCodes } from 'http-status-codes'

jest.mock('../../service/getAllMovies')

describe('allMoviesHandler', () => {
    beforeEach(() => {
        getAllMovies.mockReset()
    })

    test('returns a valid response', async () => {
        getAllMovies.mockResolvedValue(
            {
                ID: 'tt2488496',
                Poster:
                    'https://m.media-amazon.com/images/M/MV5BOTAzODEzNDAzMl5BMl5BanBnXkFtZTgwMDU1MTgzNzE@._V1_SX300.jpg',
                Title: 'Star Wars: Episode VII - The Force Awakens',
                Type: 'movie',
            },
            {
                ID: 'tt2527336',
                Poster:
                    'https://m.media-amazon.com/images/M/MV5BMjQ1MzcxNjg4N15BMl5BanBnXkFtZTgwNzgwMjY4MzI@._V1_SX300.jpg',
                Title: 'Star Wars: Episode VIII - The Last Jedi',
                Type: 'movie',
            }
        )
        await expect(
            allMoviesHandler(undefined, undefined)
        ).resolves.toMatchSnapshot()
    })

    test('throws on error from getAllMovies', async () => {
        getAllMovies.mockRejectedValue(
            new HTTPError('error', StatusCodes.NOT_FOUND)
        )
        await expect(allMoviesHandler(undefined, undefined)).rejects.toThrow(
            HTTPError
        )
    })
})
