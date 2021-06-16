const db = require('./models');
const { User, Stock, PortfolioHistory, StockHistory, Watchlist, Transaction, Holding, Portfolio, History } = db;

const USERS = [
  {id: 1, username: 'Hal20', email: 'HarryLumber@gmail.com', password: 'ilovelumber2'},
  {id: 2, username: 'JP153', email: 'JackPosu@gmail.com', password: 'pokuchefsky'},
  {id: 3, username: 'DrinaDrag21', email: 'DrinaHenderson@gmail.com', password: 'fullofclass15'},
  {id: 4, username: 'MikaCaptain55', email: 'MikaKaro@gmail.com', password: 'thisismytime3'},
  {id: 5, username: 'OllyHamilas86', email: 'OliviaHamilton.com', password: 'shineonspace47'},
];

const STOCKS = [
  {id: 1, ticker: 'GME', name: 'Gamestop', price: 236.88, open: 229.00, high: 248.48, low: 225.56, close: 235.71, volume: 1979607, marketCapitalization: 12059824675, priceToEarningsRatio: -78.89, dividendYield: 0},
  {id: 2, ticker: 'RBLX', name: 'Roblox', price: 90.72, open: 89.95, high: 95.00, low: 88.75, close: 91.41, volume: 8839627, marketCapitalization: 43501235639, priceToEarningsRatio: 104.47, dividendYield: 0},
  {id: 3, ticker: 'COIN', name: 'Coinbase', price: 242.30, open: 247.50, high: 249.39, low: 239.38, close: 243.17, volume: 9215731, marketCapitalization: 6112794372, priceToEarningsRatio: 81.20, dividendYield: 0},
  {id: 4, ticker: 'VOO', name: 'Vanguard 500 Index Fund', price: 386.46, open: 385.09, high: 385.75, low: 384.07, close: 385.18, volume: 3530680, marketCapitalization: 731345292834, priceToEarningsRatio: 27.60, dividendYield: 1.43},
  {id: 5, ticker: 'SPY', name: 'SPDR S&P 500 Trust ETF', price: 416.55, open: 418.87, high: 419.61, low: 417.76, close: 418.99, volume: 45836725, marketCapitalization: 374837283902, priceToEarningsRatio: 44.19, dividendYield: 1.35},
  {id: 6, ticker: 'MSFT', name: 'Microsoft Corporation', price: 250.68, open: 251.77, high: 252.94, low: 250.81, close: 251.07, volume: 12353529, marketCapitalization: 1856218823094, priceToEarningsRatio: 33.59, dividendYield: 0.92},
];

const WATCHLISTS = [
  {id: 1, userId: 1, tickers: ["GME", "RBLX", "COIN"]},
  {id: 2, userId: 2, tickers: ["VOO"]},
  {id: 3, userId: 3, tickers: ["GME", "COIN", "VOO"]},
  {id: 4, userId: 4, tickers: ["RBLX", "COIN", "SPY"]},
  {id: 5, userId: 5, tickers: ["GME", "RBLX", "COIN", "SPY"]}
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
  {id: 1, userId: 1, buyingPower: 95039.48, netWorth: 97705.33},
  {id: 2, userId: 2, buyingPower: 92389.10, netWorth: 93500.92},
  {id: 3, userId: 3, buyingPower: 88294.34, netWorth: 105292.77},
  {id: 4, userId: 4, buyingPower: 94929.95, netWorth: 122259.23},
  {id: 5, userId: 5, buyingPower: 96304.34, netWorth: 86021.69},
];

const HOLDINGS = [
  {id: 1, userId: 1, stockId: 6, quantity: 4, portfolioId: 1},
  {id: 2, userId: 1, stockId: 5, quantity: 5, portfolioId: 1},
  {id: 3, userId: 1, stockId: 4, quantity: 5, portfolioId: 1},
  {id: 4, userId: 2, stockId: 3, quantity: 3, portfolioId: 2},
  {id: 5, userId: 3, stockId: 2, quantity: 5, portfolioId: 3},
  {id: 6, userId: 3, stockId: 3, quantity: 5, portfolioId: 3},
  {id: 7, userId: 4, stockId: 2, quantity: 2, portfolioId: 4},
  {id: 8, userId: 5, stockId: 1, quantity: 5, portfolioId: 5},
];

const PORTFOLIOHISTORIES = [
  {id: 1, userId: 1, date:'2021-05-18T04:00:00.000Z', netWorth: '100000.00'},
  {id: 2, userId: 1, date:'2021-05-19T04:00:00.000Z', netWorth: '99466.52'},
  {id: 3, userId: 1, date:'2021-05-20T04:00:00.000Z', netWorth: '96852.91'},
  {id: 4, userId: 1, date:'2021-05-21T04:00:00.000Z', netWorth: '92293.07'},
  {id: 5, userId: 1, date:'2021-05-24T04:00:00.000Z', netWorth: '94342.28'},
  {id: 6, userId: 1, date:'2021-05-25T04:00:00.000Z', netWorth: '97230.46'},
  {id: 7, userId: 1, date:'2021-05-26T04:00:00.000Z', netWorth: '97705.33'},
  {id: 8, userId: 2, date:'2021-05-18T04:00:00.000Z', netWorth: '100000.00'},
  {id: 9, userId: 2, date:'2021-05-19T04:00:00.000Z', netWorth: '102413.76'},
  {id: 10, userId: 2, date:'2021-05-20T04:00:00.000Z', netWorth: '103672.45'},
  {id: 11, userId: 2, date:'2021-05-21T04:00:00.000Z', netWorth: '99237.29'},
  {id: 12, userId: 2, date:'2021-05-24T04:00:00.000Z', netWorth: '96438.81'},
  {id: 13, userId: 2, date:'2021-05-25T04:00:00.000Z', netWorth: '95233.41'},
  {id: 14, userId: 2, date:'2021-05-26T04:00:00.000Z', netWorth: '98286.37'},
];

const STOCKHISTORIES = [
  {id: 1, stockId: 1, date:'2021-05-18T04:00:00.000Z', price: '180.67'},
  {id: 2, stockId: 1, date:'2021-05-19T04:00:00.000Z', price: '168.83'},
  {id: 3, stockId: 1, date:'2021-05-20T04:00:00.000Z', price: '170.49'},
  {id: 4, stockId: 1, date:'2021-05-21T04:00:00.000Z', price: '176.79'},
  {id: 5, stockId: 1, date:'2021-05-24T04:00:00.000Z', price: '180.01'},
  {id: 6, stockId: 1, date:'2021-05-25T04:00:00.000Z', price: '209.43'},
  {id: 7, stockId: 1, date:'2021-05-26T04:00:00.000Z', price: '237.87'},
  {id: 8, stockId: 2, date:'2021-05-18T04:00:00.000Z', price: '74.99'},
  {id: 9, stockId: 2, date:'2021-05-19T04:00:00.000Z', price: '75.22'},
  {id: 10, stockId: 2, date:'2021-05-20T04:00:00.000Z', price: '76.33'},
  {id: 11, stockId: 2, date:'2021-05-21T04:00:00.000Z', price: '82.50'},
  {id: 12, stockId: 2, date:'2021-05-24T04:00:00.000Z', price: '89.23'},
  {id: 13, stockId: 2, date:'2021-05-25T04:00:00.000Z', price: '89.32'},
  {id: 14, stockId: 2, date:'2021-05-26T04:00:00.000Z', price: '91.07'},
  {id: 15, stockId: 3, date:'2021-05-18T04:00:00.000Z', price: '239.00'},
  {id: 16, stockId: 3, date:'2021-05-19T04:00:00.000Z', price: '224.80'},
  {id: 17, stockId: 3, date:'2021-05-20T04:00:00.000Z', price: '233.40'},
  {id: 18, stockId: 3, date:'2021-05-21T04:00:00.000Z', price: '224.35'},
  {id: 19, stockId: 3, date:'2021-05-24T04:00:00.000Z', price: '225.30'},
  {id: 20, stockId: 3, date:'2021-05-25T04:00:00.000Z', price: '242.41'},
  {id: 21, stockId: 3, date:'2021-05-26T04:00:00.000Z', price: '241.71'},
  {id: 22, stockId: 4, date:'2021-05-18T04:00:00.000Z', price: '378.73'},
  {id: 23, stockId: 4, date:'2021-05-19T04:00:00.000Z', price: '377.73'},
  {id: 24, stockId: 4, date:'2021-05-20T04:00:00.000Z', price: '381.76'},
  {id: 25, stockId: 4, date:'2021-05-21T04:00:00.000Z', price: '381.47'},
  {id: 26, stockId: 4, date:'2021-05-24T04:00:00.000Z', price: '385.32'},
  {id: 27, stockId: 4, date:'2021-05-25T04:00:00.000Z', price: '384.51'},
  {id: 28, stockId: 4, date:'2021-05-26T04:00:00.000Z', price: '385.24'},
  {id: 29, stockId: 5, date:'2021-05-18T04:00:00.000Z', price: '411.94'},
  {id: 30, stockId: 5, date:'2021-05-19T04:00:00.000Z', price: '410.86'},
  {id: 31, stockId: 5, date:'2021-05-20T04:00:00.000Z', price: '415.28'},
  {id: 32, stockId: 5, date:'2021-05-21T04:00:00.000Z', price: '414.94'},
  {id: 33, stockId: 5, date:'2021-05-24T04:00:00.000Z', price: '419.17'},
  {id: 34, stockId: 5, date:'2021-05-25T04:00:00.000Z', price: '418.24'},
  {id: 35, stockId: 5, date:'2021-05-26T04:00:00.000Z', price: '419.12'},
  {id: 36, stockId: 6, date:'2021-05-18T04:00:00.000Z', price: '243.08'},
  {id: 37, stockId: 6, date:'2021-05-19T04:00:00.000Z', price: '243.12'},
  {id: 38, stockId: 6, date:'2021-05-20T04:00:00.000Z', price: '246.48'},
  {id: 39, stockId: 6, date:'2021-05-21T04:00:00.000Z', price: '245.17'},
  {id: 40, stockId: 6, date:'2021-05-24T04:00:00.000Z', price: '250.78'},
  {id: 41, stockId: 6, date:'2021-05-25T04:00:00.000Z', price: '251.72'},
  {id: 42, stockId: 6, date:'2021-05-26T04:00:00.000Z', price: '251.13'},
];

const HISTORIES = [
  {id: 1, userId: 1, date: '2021-04-10T10:00:00.000Z', netWorth: 73000.00},
  {id: 2, userId: 1, date: '2021-04-10T10:15:00.000Z', netWorth: 73005.00},
  {id: 3, userId: 1, date: '2021-04-10T10:30:00.000Z', netWorth: 73025.00},
  {id: 4, userId: 2, date: '2021-04-10T10:00:00.000Z', netWorth: 23400.00},
  {id: 5, userId: 2, date: '2021-04-10T10:15:00.000Z', netWorth: 23500.00},
  {id: 6, userId: 2, date: '2021-04-10T10:30:00.000Z', netWorth: 22700.00},
  {id: 7, userId: 3, date: '2021-04-10T10:00:00.000Z', netWorth: 18000.00},
  {id: 8, userId: 3, date: '2021-04-10T10:15:00.000Z', netWorth: 18500.00},
  {id: 9, userId: 3, date: '2021-04-10T10:30:00.000Z', netWorth: 18525.00},
  {id: 10, userId: 4, date: '2021-04-10T10:00:00.000Z', netWorth: 45500.00},
  {id: 11, userId: 4, date: '2021-04-10T10:15:00.000Z', netWorth: 45020.00},
  {id: 12, userId: 4, date: '2021-04-10T10:30:00.000Z', netWorth: 45300.00},
  {id: 13, userId: 5, date: '2021-04-10T10:00:00.000Z', netWorth: 2500.00},
  {id: 14, userId: 5, date: '2021-04-10T10:15:00.000Z', netWorth: 2555.00},
  {id: 15, userId: 5, date: '2021-04-10T10:30:00.000Z', netWorth: 2320.00},
];

const seed = () => {
  return db.sequelize.sync({force: false})
    .then(() => {
      // Create all the entries
      let userPromises = USERS.map(u => User.create(u));
      let stockPromises = STOCKS.map(s => Stock.create(s));
      return Promise.all([...userPromises, ...stockPromises])
      .then(() => {
        let watchlistPromises = WATCHLISTS.map(w => Watchlist.create(w));
        let portfolioHistoryPromises = PORTFOLIOHISTORIES.map(ph => PortfolioHistory.create(ph));
        let stockHistoryPromises = STOCKHISTORIES.map(sh => StockHistory.create(sh));
        let transactionPromises = TRANSACTIONS.map(t => Transaction.create(t));
        let portfolioPromises = PORTFOLIOS.map(p => Portfolio.create(p));
        let historyPromises = HISTORIES.map(ht => History.create(ht));
        return Promise.all([...watchlistPromises, ...portfolioHistoryPromises, ...stockHistoryPromises, ...transactionPromises, ...portfolioPromises, ...historyPromises])
        .then(() => {
          let holdingPromises = HOLDINGS.map(hd => Holding.create(hd));
          return Promise.all([...holdingPromises])
        })
      })
    })
}

module.exports = seed;