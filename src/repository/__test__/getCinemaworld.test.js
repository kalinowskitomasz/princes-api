import { getCinemaworldMovies } from '../getCinemaworld'
import fetchFromApi from '../fetchFromApi'
jest.mock('../fetchFromApi')

describe('getCinemaworld', () => {
    beforeEach(() => {
        fetchFromApi.mockReset()
    })

    test('correct response', () => {
        fetchFromApi.mockResolvedValue({ Movies: ['aaa'] })
        expect(getCinemaworldMovies()).resolves.toEqual(['aaa'])
    })

    test('response missing Movies returns empty array', () => {
        fetchFromApi.mockResolvedValue({})
        expect(getCinemaworldMovies()).resolves.toEqual([])
    })
})
