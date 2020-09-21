# Prince's API

Serverless API for Prince's Theatre using Cloudflare Workers

## API

`/movies` - return list of movies available from both sources

`/movie/:id` - return movie info and pricing for a single film, id has to be valid IMDB id (7-10 digits prefixed with 'tt')

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

## Developer notes

### Goals

Deliver working working MVP to a client as fast as possible to get a quick user feedback agile way.

As the client is a small cinema I assumed application should to be cheap to run and maintain.

#### Tech stack

I decided to use serverless to keep the backend as simple as possible and deliver quickly first iteration. I used Cloudflare Workers rather than AWS for simplicity and keeping costs down (just \$5 monthly bill).
On a frontend I went with just a simple create-react-app and also deployed it with Workers. I thought Gatsby or Next would to be too heavy and overkill for this.

#### Tradeoffs

At first I considered scraping API data and putting it in some storage (database or Redis) then serving but opted not to do it as a lot of commercial APIs disallow this. Instead I implemented caching logic with generous TTL, as the data should not change very frequently.

#### Next steps

/movies endpoint is a place where going further scaling problems might have to be solved. I'd probably implement
paging logic (or cursor for infinite scroll one) and on frontend use react-virtualized to load only visible data (or paginate data).
Also to improve reliability I'd add a fallback cache for the 3rd party APIs.
Some works needs to be done around sound deployment too (extra headers, etc.).

On frontend some nice placeholders should replace current temp ones.
