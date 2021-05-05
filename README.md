# IDX Summary API

IDX stocks summary API

## Running the application

```sh
# clone the repository
git clone https://github.com/devardha/idx-summary-api.git
cd idx-summary-api
```

```sh
# install dependencies
npm install
```

```sh
# run the development server
npm run dev

# visit http://localhost:4000
```

## API Endpoints
- `/summary/:code`

## Example
- `/summary/ANTM`: get summary of stock ANTM

## Response
```json
{
    "status": "ok",
    "code": "ANTM",
    "company_name": "Aneka Tambang Tbk. (ANTM)",
    "data": {
        "close": 2620,
        "prev": 2520,
        "change": "100 (3.97%)",
        "growth": "up",
        "open": 0,
        "high": 2640,
        "low": 2500,
        "date": "2021-05-03T17:00:00.000Z"
    }
}
```