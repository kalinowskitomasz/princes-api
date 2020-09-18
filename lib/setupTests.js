import fetch, { URL } from 'node-fetch'

// use node-fetch to fake the cloudworkers fetch
global.fetch = fetch
