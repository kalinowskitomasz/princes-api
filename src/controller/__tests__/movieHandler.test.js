import { StatusCodes } from 'http-status-codes'

import movieHandler, { validateId } from '../movieHandler'
import getMovie from '../../service/getMovie'
import HTTPError from '../../lib/HTTPError'

jest.mock('../../service/getMovie')

describe('validateId', () => {
    test('returns true on correct id', () => {
        expect(validateId('tt1234567')).toBeTruthy()
        expect(validateId('tt12345678')).toBeTruthy()
    })

    test('returns false on correct id', () => {
        expect(validateId('t1234567')).toBeFalsy()
        expect(validateId('aaaatt12345678')).toBeFalsy()
    })
})

describe('movieHandler', () => {
    beforeEach(() => {
        getMovie.mockReset()
    })

    test('returns bad request on incorrect id', async () => {
        await expect(movieHandler({ id: 'aatt1234567' }, null)).rejects.toEqual(
            new HTTPError('Incorrect id', StatusCodes.BAD_REQUEST)
        )
    })

    test('returns bad request on missing id', async () => {
        await expect(movieHandler({}, null)).rejects.toEqual(
            new HTTPError('Incorrect id', StatusCodes.BAD_REQUEST)
        )
    })

    test('returns data for correct id', async () => {
        getMovie.mockResolvedValue({
            ID: 'tt2527336',
            Title: 'Star Wars: Episode VIII - The Last Jedi',
            Year: '2017',
            Rated: 'PG-13',
            Released: '15 Dec 2017',
            Runtime: '152 min',
            Genre: 'Action, Adventure, Fantasy, Sci-Fi',
            Director: 'Rian Johnson',
            Writer:
                'Rian Johnson, George Lucas (based on characters created by)',
            Actors: 'Mark Hamill, Carrie Fisher, Adam Driver, Daisy Ridley',
            Plot:
                'Rey develops her newly discovered abilities with the guidance of Luke Skywalker, who is unsettled by the strength of her powers. Meanwhile, the Resistance prepares for battle with the First Order.',
            Language: 'English',
            Country: 'USA',
            Poster:
                'https://m.media-amazon.com/images/M/MV5BMjQ1MzcxNjg4N15BMl5BanBnXkFtZTgwNzgwMjY4MzI@._V1_SX300.jpg',
            Type: 'movie',
            Production: 'Walt Disney Pictures',
            Price: {
                'Film World': 24,
                'Cinema World': 24,
            },
        })
        await expect(
            movieHandler({ id: 'tt2527336' }, null)
        ).resolves.toMatchSnapshot()
    })
})
