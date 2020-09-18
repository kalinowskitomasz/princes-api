import { fetchRetry } from '../fetchfromApi'
import { logError } from '../../lib/logger'
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

    test('fails once then succeess', async () => {
        nock('https://test')
            .get('/movies')
            .reply(404, 'NotFound')
            .get('/movies')
            .reply(200, { Movies: ['aaa'] })

        await expect(fetchRetry('https://test/movies', {}, 2)).resolves.toEqual(
            {
                Movies: ['aaa'],
            }
        )

        expect(logError).toHaveBeenCalled()
    })

    test('fails while parsing json', async () => {
        nock('https://test')
            .get('/movies')
            .reply(404, 'NotFound')
            .get('/movies')
            .reply(200, "{ Movies: ['aaa'] }")

        await expect(fetchRetry('https://test/movies', {}, 2)).resolves.toEqual(
            {
                Movies: ['aaa'],
            }
        )

        expect(logError).toHaveBeenCalled()
    })
})
