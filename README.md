# Prince's API

Serverless API for Prince's Theatre using Cloudflare Workers

## API

`/movies` - return list of movies available from both sources

`/movie/:id` - return movie info and pricing for a single film

## Environment Variables

|       env       |       description        |      location      |
| :-------------: | :----------------------: | :----------------: |
|  FILMWORLD_API  |  filmworld API endpoint  |   wrangler.toml    |
| CINEMAWORLD_API | cinemaworld API endpoint |   wrangler.toml    |
| ALLOWED_ORIGIN  |       cors policy        |   wrangler.toml    |
|     API_KEY     |         API key          | Cloudflare secrets |

## Local Development

### Requirements

npm >= 6.0.0

[wrangler CLI](https://developers.cloudflare.com/workers/).
`npm install -g @cloudflare/wrangler`

Cloudflare account

### Running locally

Change `account_id` in `wrangler.toml` file to you account id.
More [in the documentation](https://workers.cloudflare.com/docs/quickstart/configuring-and-publishing/)

then add API_KEY to secrets

```
wrangler put API_KEY --env development
```

get dependencies and run

```
npm install
wrangler dev --env development
```

## Testing

```
npm test
```
