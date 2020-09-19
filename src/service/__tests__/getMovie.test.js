import getMovie from '../getMovie'
import { getCinemaworldMovie } from '../../repository/cinemaworld'
import { getFilmworldMovie } from '../../repository/filmworld'

import HTTPError from '../../lib/HTTPError'

jest.mock('../../repository/cinemaworld')
jest.mock('../../repository/filmworld')

describe('getMovie', () => {
    beforeEach(() => {
        getCinemaworldMovie.mockReset()
        getFilmworldMovie.mockReset()
    })

    test('returns merged data on correct response from both sources', async () => {
        getCinemaworldMovie.mockResolvedValue({
            error: null,
            data: {
                ID: 'cw2527336',
                Title: 'Star Wars: Episode VIII - The Last Jedi',
                Price: 24,
                Source: 'Cinema World',
            },
        })

        getFilmworldMovie.mockResolvedValue({
            error: null,
            data: {
                ID: 'fw2527336',
                Title: 'Star Wars: Episode VIII - The Last Jedi',
                Price: 24.5,
                Source: 'Film World',
            },
        })

        await expect(getMovie('tt2527336')).resolves.toEqual({
            ID: 'tt2527336',
            Title: 'Star Wars: Episode VIII - The Last Jedi',
            Price: {
                'Cinema World': 24,
                'Film World': 24.5,
            },
        })
    })
})
