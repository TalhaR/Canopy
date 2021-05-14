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

**URL** : `http://localhost:8080/api/holdings/user/2`

**Method** : `GET`

## Success Response

**Code** : `200 OK`

**Content example**

```json
[
    {
        "id": 2,
        "quantity": 3,
        "createdAt": "2021-05-13T01:47:50.637Z",
        "updatedAt": "2021-05-13T01:47:50.637Z",
        "userId": 2,
        "stockId": 3,
        "portfolioId": 2
    }
]
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
