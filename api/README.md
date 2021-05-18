# API Endpoints

# Get A User by ID

**URL** : `http://localhost:8080/api/users/2`

**Method** : `GET`

## Success Response

**Code** : `200 OK`

**Content example**

```json
[
    {
        "id": 2,
        "username": "JP153",
        "email": "JackPosu@gmail.com",
        "password": "pokuchefsky",
        "createdAt": "2021-05-13T01:26:57.361Z",
        "updatedAt": "2021-05-13T01:26:57.361Z"
    }
]
```

# Get All Stocks

**URL** : `http://localhost:8080/api/stocks`

**Method** : `GET`

## Success Response

**Code** : `200 OK`

**Content example**

```json
[
    {
        "id": 1,
        "ticker": "GME",
        "name": "Gamestop",
        "price": 154.69,
        "createdAt": "2021-05-13T01:26:57.361Z",
        "updatedAt": "2021-05-13T01:26:57.361Z"
    },
    {
        "id": 2,
        "ticker": "RBLX",
        "name": "Roblox",
        "price": 75.85,
        "createdAt": "2021-05-13T01:26:57.362Z",
        "updatedAt": "2021-05-13T01:26:57.362Z"
    },
    {
        "id": 3,
        "ticker": "COIN",
        "name": "Coinbase",
        "price": 342.18,
        "createdAt": "2021-05-13T01:26:57.362Z",
        "updatedAt": "2021-05-13T01:26:57.362Z"
    }
]
```

# Get a Stock by Ticker

**URL** : `http://localhost:8080/api/stocks/COIN`

**Method** : `GET`

## Success Response

**Code** : `200 OK`

**Content example**

```json
[
    {
        "id": 3,
        "ticker": "COIN",
        "name": "Coinbase",
        "price": 342.18,
        "createdAt": "2021-05-13T01:26:57.362Z",
        "updatedAt": "2021-05-13T01:26:57.362Z"
    }
]
```

# Update current price of a stock by its ticker

**URL** : `http://localhost:8080/api/stocks/GME`

**Method** : `PATCH`

```json
{
    "price": "180.52"
}
```

## Success Response

**Code** : `200 OK`

**Content example**

```json
[
    {
        "id": 1,
        "ticker": "GME",
        "name": "Gamestop",
        "price": 180.52,
        "createdAt": "2021-05-13T01:26:57.361Z",
        "updatedAt": "2021-05-13T01:44:49.158Z"
    }
]
```

# Get all transactions by a user

**URL** : `http://localhost:8080/api/transactions/user/3`

**Method** : `GET`

## Success Response

**Code** : `200 OK`

**Content example**

```json
[
    {
        "id": 2,
        "date": "2021-04-12T02:15:08.000Z",
        "buy": true,
        "quantity": 5,
        "price": 379.25,
        "createdAt": "2021-05-13T01:47:50.635Z",
        "updatedAt": "2021-05-13T01:47:50.635Z",
        "stockId": 2,
        "userId": 3
    },
    {
        "id": 4,
        "date": "2021-04-15T12:15:08.000Z",
        "buy": true,
        "quantity": 5,
        "price": 1710.9,
        "createdAt": "2021-05-13T01:47:50.636Z",
        "updatedAt": "2021-05-13T01:47:50.636Z",
        "stockId": 3,
        "userId": 3
    }
]
```

# Get the holdings of a specific user

**URL** : `http://localhost:8080/api/holdings/user/3`

**Method** : `GET`

## Success Response

**Code** : `200 OK`

**Content example**

```json
[
  {
    "ticker": "RBLX",
    "quantity": 5
  },
  {
    "ticker": "COIN",
    "quantity": 5
  }
]
```

# Add a stock holding for a specific user

**URL** : `http://localhost:8080/api/holdings/user/2`

**Method** : `POST`

**Data example**

```json
{
	"stockId": "3",
	"quantity": "10"
}
```

## Success Response

**Code** : `200 OK`

**Content example**

```json
{
	"id": 7,
	"userId": 2,
	"portfolioId": 2,
	"stockId": 3,
	"quantity": 10,
	"updatedAt": "2021-05-14T19:05:19.886Z",
  	"createdAt": "2021-05-14T19:05:19.886Z"
}
```

# Edit a stock holding for a specific user

**URL** : `http://localhost:8080/api/holdings/user/2`

**Method** : `PUT`

**Data example**

```json
{
	"stockId": "3",
	"quantity": "550"
}
```

## Success Response

**Code** : `201 CREATED`

**Content example**

```json
{
  "id": 4,
  "quantity": 550,
  "createdAt": "2021-05-14T18:41:11.861Z",
  "updatedAt": "2021-05-14T18:41:28.076Z",
  "userId": 3,
  "stockId": 3,
  "portfolioId": 3
}
```

# Delete a stock holding for a specific user

**URL** : `http://localhost:8080/api/holdings/user/3`

**Method** : `DELETE`

**Data example**

```json
{
	"stockId": "3"
}
```

## Success Response

**Code** : `200 OK`

**Content example**

```json
{
	"Deleted a holding."
}
```

# Get the portfolio of a specific user

**URL** : `http://localhost:8080/api/portfolios/user/2`

**Method** : `GET`

## Success Response

**Code** : `200 OK`

**Content example**

```json
[
    {
        "id": 2,
        "buyingPower": 15000,
        "netWorth": 23500,
        "createdAt": "2021-05-13T01:47:50.636Z",
        "updatedAt": "2021-05-13T01:47:50.636Z",
        "userId": 2
    }
]
```

# Get the watchlist of a specific user

**URL** : `http://localhost:8080/api/watchlists/5`

**Method** : `GET`

## Success Response

**Code** : `200 OK`

**Content example**

```json
{
	"Watchlist": [
		"GME",
		"RBLX",
		"COIN",
		"SPY"
	]
}
```

# Edit the watchlist of a specific user

**URL** : `http://localhost:8080/api/watchlists/5`

**Method** : `PUT`

## Success Response

**Code** : `201 CREATED`

**Content example**

```json
{
  "id": 5,
  "tickers": [
    "VOO",
    "GME"
  ],
  "createdAt": "2021-05-18T02:46:50.813Z",
  "updatedAt": "2021-05-18T02:49:23.883Z",
  "userId": 5
}
```

# Get the historical portfolio net worth of a user

**URL** : `http://localhost:8080/api/portfolio-histories/1`

**Method** : `GET`

## Success Response

**Code** : `200 OK`

**Content example**

```json
[
  {
    "date": "2021-05-07T00:00:00.000Z",
    "netWorth": 100000
  },
  {
    "date": "2021-05-10T00:00:00.000Z",
    "netWorth": 99466.52
  },
  {
    "date": "2021-05-11T00:00:00.000Z",
    "netWorth": 96852.91
  },
  {
    "date": "2021-05-13T00:00:00.000Z",
    "netWorth": 94342.28
  },
  {
    "date": "2021-05-14T00:00:00.000Z",
    "netWorth": 97230.46
  },
  {
    "date": "2021-05-12T00:00:00.000Z",
    "netWorth": 92293.07
  },
  {
    "date": "2021-05-17T00:00:00.000Z",
    "netWorth": 97705.33
  }
]
```

# Get the historical data of a stock

**URL** : `http://localhost:8080/api/stock-histories/1`

**Method** : `GET`

## Success Response

**Code** : `200 OK`

**Content example**

```json
[
  {
    "date": "2021-05-07T00:00:00.000Z",
    "price": 161.11
  },
  {
    "date": "2021-05-10T00:00:00.000Z",
    "price": 143.22
  },
  {
    "date": "2021-05-11T00:00:00.000Z",
    "price": 146.92
  },
  {
    "date": "2021-05-12T00:00:00.000Z",
    "price": 144.79
  },
  {
    "date": "2021-05-13T00:00:00.000Z",
    "price": 164.5
  },
  {
    "date": "2021-05-14T00:00:00.000Z",
    "price": 159.92
  },
  {
    "date": "2021-05-17T00:00:00.000Z",
    "price": 180.6
  }
]
```
