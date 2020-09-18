import moviesHandler from '../moviesHandler'
import getMovies from '../../service/getMovies'

jest.mock('../../service/getMovies')

describe('moviesHandler', () => {
    beforeEach(() => {
        getMovies.mockReset()
    })

    test('returns valid response', () => {
        
    })
})
