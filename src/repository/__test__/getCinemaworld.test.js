import { getCinemaworldMovies } from '../getCinemaworld'
import fetchFromApi from '../fetchFromApi'
jest.mock('../fetchFromApi')

describe('getCinemaworld', () => {
    beforeEach(() => {
        fetchFromApi.mockReset()
    })

    test('correct response', async () => {
        fetchFromApi.mockResolvedValue({ Movies: ['aaa'] })
        await expect(getCinemaworldMovies()).resolves.toEqual(['aaa'])
    })

    test('response missing Movies returns empty array', async () => {
        fetchFromApi.mockResolvedValue({})
        await expect(getCinemaworldMovies()).resolves.toEqual([])
    })
})
