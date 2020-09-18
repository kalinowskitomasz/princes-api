export default class HTTPError extends Error {
    constructor(message, status) {
        super(message)
        this.status = status
    }
}
