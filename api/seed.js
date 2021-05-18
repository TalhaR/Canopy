const db = require('./models');
const { User, Stock, StockHistory, Watchlist, Transaction, Holding, Portfolio, History } = db;

const USERS = [
  {id: 1, username: 'Hal20', email: 'HarryLumber@gmail.com', password: 'ilovelumber2'},
  {id: 2, username: 'JP153', email: 'JackPosu@gmail.com', password: 'pokuchefsky'},
  {id: 3, username: 'DrinaDrag21', email: 'DrinaHenderson@gmail.com', password: 'fullofclass15'},
  {id: 4, username: 'MikaCaptain55', email: 'MikaKaro@gmail.com', password: 'thisismytime3'},
  {id: 5, username: 'OllyHamilas86', email: 'OliviaHamilton.com', password: 'shineonspace47'},
];

const STOCKS = [
  {id: 1, ticker: 'GME', name: 'Gamestop', price: 154.69},
  {id: 2, ticker: 'RBLX', name: 'Roblox', price: 75.85},
  {id: 3, ticker: 'COIN', name: 'Coinbase', price: 342.18},
  {id: 4, ticker: 'VOO', name: 'Vanguard 500 Index Fund', price: 382.03},
  {id: 5, ticker: 'SPY', name: 'SPDR S&P 500 Trust ETF', price: 415.52},
];

const WATCHLISTS = [
  {id: 1, userId: 1, tickers: ["GME", "RBLX"]},
  {id: 2, userId: 2, tickers: ["VOO"]},
  {id: 3, userId: 3, tickers: ["GME", "COIN", "VOO"]},
  {id: 4, userId: 4, tickers: ["RBLX", "COIN", "SPY"]},
  {id: 5, userId: 5, tickers: ["GME", "RBLX", "COIN", "SPY"]},
];

const TRANSACTIONS = [
  {id: 1, userId: 1, stockId: 1, date: '2021-04-10T10:15:08.000Z', buy: true, quantity: '7', price: '1082.83'},
  {id: 2, userId: 3, stockId: 2, date: '2021-04-12T02:15:08.000Z', buy: true, quantity: '5', price: '379.25'},
  {id: 3, userId: 2, stockId: 3, date: '2021-04-14T15:30:08.000Z', buy: true, quantity: '3', price: '1026.54'},
  {id: 4, userId: 3, stockId: 3, date: '2021-04-15T12:15:08.000Z', buy: true, quantity: '5', price: '1710.90'},
  {id: 5, userId: 5, stockId: 1, date: '2021-04-16T10:18:08.000Z', buy: false, quantity: '5', price: '773.45'},
  {id: 6, userId: 4, stockId: 2, date: '2021-04-16T10:21:26.000Z', buy: true, quantity: '2', price: '151.70'},
];

const PORTFOLIOS = [
  {id: 1, userId: 1, buyingPower: 8232.21, netWorth: 70000},
  {id: 2, userId: 2, buyingPower: 15000, netWorth: 23500},
  {id: 3, userId: 3, buyingPower: 3247, netWorth: 16592},
  {id: 4, userId: 4, buyingPower: 33629, netWorth: 45200},
  {id: 5, userId: 5, buyingPower: 76, netWorth: 2522},
];

const HOLDINGS = [
  {id: 1, userId: 1, stockId: 1, quantity: 2, portfolioId: 1},
  {id: 2, userId: 2, stockId: 3, quantity: 3, portfolioId: 2},
  {id: 3, userId: 3, stockId: 2, quantity: 5, portfolioId: 3},
  {id: 4, userId: 3, stockId: 3, quantity: 5, portfolioId: 3},
  {id: 5, userId: 4, stockId: 2, quantity: 2, portfolioId: 4},
  {id: 6, userId: 5, stockId: 1, quantity: 5, portfolioId: 5},
];

const STOCKHISTORIES = [
  {id: 1, stockId: 1, date:'2021-05-07T00:00:00.000Z', price: '161.11'},
  {id: 2, stockId: 1, date:'2021-05-10T00:00:00.000Z', price: '143.22'},
  {id: 3, stockId: 1, date:'2021-05-11T00:00:00.000Z', price: '146.92'},
  {id: 4, stockId: 1, date:'2021-05-12T00:00:00.000Z', price: '144.79'},
  {id: 5, stockId: 1, date:'2021-05-13T00:00:00.000Z', price: '164.50'},
  {id: 6, stockId: 1, date:'2021-05-14T00:00:00.000Z', price: '159.92'},
  {id: 7, stockId: 1, date:'2021-05-17T00:00:00.000Z', price: '180.60'},
  {id: 8, stockId: 2, date:'2021-05-07T00:00:00.000Z', price: '67.90'},
  {id: 9, stockId: 2, date:'2021-05-10T00:00:00.000Z', price: '64.00'},
  {id: 10, stockId: 2, date:'2021-05-11T00:00:00.000Z', price: '77.65'},
  {id: 11, stockId: 2, date:'2021-05-12T00:00:00.000Z', price: '75.53'},
  {id: 12, stockId: 2, date:'2021-05-13T00:00:00.000Z', price: '69.68'},
  {id: 13, stockId: 2, date:'2021-05-14T00:00:00.000Z', price: '70.95'},
  {id: 14, stockId: 2, date:'2021-05-17T00:00:00.000Z', price: '76.93'},
  {id: 15, stockId: 3, date:'2021-05-07T00:00:00.000Z', price: '263.70'},
  {id: 16, stockId: 3, date:'2021-05-10T00:00:00.000Z', price: '293.45'},
  {id: 17, stockId: 3, date:'2021-05-11T00:00:00.000Z', price: '303.00'},
  {id: 18, stockId: 3, date:'2021-05-12T00:00:00.000Z', price: '283.61'},
  {id: 19, stockId: 3, date:'2021-05-13T00:00:00.000Z', price: '265.10'},
  {id: 20, stockId: 3, date:'2021-05-14T00:00:00.000Z', price: '258.37'},
  {id: 21, stockId: 3, date:'2021-05-17T00:00:00.000Z', price: '248.24'},
  {id: 22, stockId: 4, date:'2021-05-07T00:00:00.000Z', price: '388.03'},
  {id: 23, stockId: 4, date:'2021-05-10T00:00:00.000Z', price: '384.23'},
  {id: 24, stockId: 4, date:'2021-05-11T00:00:00.000Z', price: '380.86'},
  {id: 25, stockId: 4, date:'2021-05-12T00:00:00.000Z', price: '372.73'},
  {id: 26, stockId: 4, date:'2021-05-13T00:00:00.000Z', price: '377.16'},
  {id: 27, stockId: 4, date:'2021-05-14T00:00:00.000Z', price: '382.95'},
  {id: 28, stockId: 4, date:'2021-05-17T00:00:00.000Z', price: '382.03'},
  {id: 29, stockId: 5, date:'2021-05-07T00:00:00.000Z', price: '422.12'},
  {id: 30, stockId: 5, date:'2021-05-10T00:00:00.000Z', price: '417.94'},
  {id: 31, stockId: 5, date:'2021-05-11T00:00:00.000Z', price: '414.21'},
  {id: 32, stockId: 5, date:'2021-05-12T00:00:00.000Z', price: '405.41'},
  {id: 33, stockId: 5, date:'2021-05-13T00:00:00.000Z', price: '410.28'},
  {id: 34, stockId: 5, date:'2021-05-14T00:00:00.000Z', price: '416.58'},
  {id: 35, stockId: 5, date:'2021-05-17T00:00:00.000Z', price: '415.52'},
];

const HISTORIES = [
  {id: 1, userId: 1, date: '2021-04-10T10:00:00.000Z', netWorth: 73000},
  {id: 2, userId: 1, date: '2021-04-10T10:15:00.000Z', netWorth: 73005},
  {id: 3, userId: 1, date: '2021-04-10T10:30:00.000Z', netWorth: 73025},
  {id: 4, userId: 2, date: '2021-04-10T10:00:00.000Z', netWorth: 23400},
  {id: 5, userId: 2, date: '2021-04-10T10:15:00.000Z', netWorth: 23500},
  {id: 6, userId: 2, date: '2021-04-10T10:30:00.000Z', netWorth: 22700},
  {id: 7, userId: 3, date: '2021-04-10T10:00:00.000Z', netWorth: 18000},
  {id: 8, userId: 3, date: '2021-04-10T10:15:00.000Z', netWorth: 18500},
  {id: 9, userId: 3, date: '2021-04-10T10:30:00.000Z', netWorth: 18525},
  {id: 10, userId: 4, date: '2021-04-10T10:00:00.000Z', netWorth: 45500},
  {id: 11, userId: 4, date: '2021-04-10T10:15:00.000Z', netWorth: 45020},
  {id: 12, userId: 4, date: '2021-04-10T10:30:00.000Z', netWorth: 45300},
  {id: 13, userId: 5, date: '2021-04-10T10:00:00.000Z', netWorth: 2500},
  {id: 14, userId: 5, date: '2021-04-10T10:15:00.000Z', netWorth: 2555},
  {id: 15, userId: 5, date: '2021-04-10T10:30:00.000Z', netWorth: 2320},
];

const seed = () => {
  return db.sequelize.sync({force: true})
    .then(() => {
      // Create all the entries
      let userPromises = USERS.map(u => User.create(u));
      let stockPromises = STOCKS.map(s => Stock.create(s));
      return Promise.all([...userPromises, ...stockPromises])
      .then(() => {
        let watchlistPromises = WATCHLISTS.map(w => Watchlist.create(w));
        let stockHistoryPromises = STOCKHISTORIES.map(sh => StockHistory.create(sh));
        let transactionPromises = TRANSACTIONS.map(t => Transaction.create(t));
        let portfolioPromises = PORTFOLIOS.map(p => Portfolio.create(p));
        let historyPromises = HISTORIES.map(ht => History.create(ht));
        return Promise.all([...watchlistPromises, ...stockHistoryPromises, ...transactionPromises, ...portfolioPromises, ...historyPromises])
        .then(() => {
          let holdingPromises = HOLDINGS.map(hd => Holding.create(hd));
          return Promise.all([...holdingPromises])
        })
      })
    })
}

module.exports = seed;