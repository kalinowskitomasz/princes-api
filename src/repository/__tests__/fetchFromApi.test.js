import { fetchRetry } from '../fetchfromApi'
import { logError } from '../../lib/logger'
import HTTPError from '../../lib/HTTPError'
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
            .reply(404, 'Not Found')
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
            .reply(404, 'Not Found')
            .get('/movies')
            .reply(200, 'aaaa')

        await expect(fetchRetry('https://test/movies', {}, 2)).rejects.toThrow(
            Error
        )

        expect(logError).toHaveBeenCalled()
    })

    test('fails on retry', async () => {
        nock('https://test')
            .get('/movies')
            .reply(404, 'Not Found')
            .get('/movies')
            .reply(404, 'Not Found')

        await expect(fetchRetry('https://test/movies', {}, 1)).rejects.toThrow(
            HTTPError
        )

        expect(logError).toHaveBeenCalled()
    })
})
