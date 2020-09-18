import { fetchRetry } from '../fetchfromApi'
import nock from 'nock'

describe('fetchRetry', () => {
    test('works correctly', () => {
        nock('https://test')
            .get('/movies')
            .reply(200, { Movies: ['aaa'] })

        expect(fetchRetry('https://test/movies', {}, 2)).resolves.toEqual({
            Movies: ['aaa'],
        })
    })
})
