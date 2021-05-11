const db = require('./models');
const { User, Stock, Transaction, Holding, Portfolio, History } = db;

const USERS = [
    { username: 'Hal20', email: 'HarryLumber@gmail.com', password: 'ilovelumber2' },
    { username: 'JP153', email: 'JackPosu@gmail.com', password: 'pokuchefsky' },
    { username: 'DrinaDrag21', email: 'DrinaHenderson@gmail.com', password: 'fullofclass15' },
    { username: 'MikaCaptain55', email: 'MikaKaro@gmail.com', password: 'thisismytime3' },
    { username: 'OllyHamilas86', email: 'OliviaHamilton.com', password: 'shineonspace47' },
];

const STOCKS = [
    { id: 1, ticker: 'GME', name: 'Gamestop', price: 154.69 },
    { id: 2, ticker: 'RBLX', name: 'Roblox', price: 75.85 },
    { id: 3, ticker: 'COIN', name: 'Coinbase', price: 342.18 },
];

const TRANSACTIONS = [
    { id: 1, userId: 1, stockId: 1, date: '2021-04-10T10:15:08.000Z', buy: true, quantity: '7', price: '1082.83' },
    { id: 2, userId: 3, stockId: 2, date: '2021-04-12T02:15:08.000Z', buy: true, quantity: '5', price: '379.25' },
    { id: 3, userId: 2, stockId: 3, date: '2021-04-14T15:30:08.000Z', buy: true, quantity: '3', price: '1026.54' },
    { id: 4, userId: 3, stockId: 3, date: '2021-04-15T12:15:08.000Z', buy: true, quantity: '5', price: '1710.90' },
    { id: 5, userId: 5, stockId: 1, date: '2021-04-16T10:18:08.000Z', buy: false, quantity: '5', price: '773.45' },
    { id: 6, userId: 4, stockId: 2, date: '2021-04-16T10:21:26.000Z', buy: true, quantity: '2', price: '151.70' },
];

const HOLDINGS = [
    { id: 1, userId: 1, stockId: 1, quantity: 2, portfolioId: 1 },
    { id: 2, userId: 2, stockId: 3, quantity: 3, portfolioId: 2 },
    { id: 3, userId: 3, stockId: 2, quantity: 5, portfolioId: 3 },
    { id: 4, userId: 3, stockId: 3, quantity: 5, portfolioId: 3 },
    { id: 5, userId: 4, stockId: 2, quantity: 2, portfolioId: 4 },
    { id: 6, userId: 5, stockId: 1, quantity: 5, portfolioId: 5 },
];

const PORTFOLIOS = [
    { id: 1, userId: 1, buyingPower: 8232.21, netWorth: 70000 },
    { id: 2, userId: 2, buyingPower: 15000, netWorth: 23500 },
    { id: 3, userId: 3, buyingPower: 3247, netWorth: 16592 },
    { id: 4, userId: 4, buyingPower: 33629, netWorth: 45200 },
    { id: 5, userId: 5, buyingPower: 76, netWorth: 2522 },
];

const HISTORIES = [
    { id: 1, userId: 1, date: '2021-04-10T10:00:00.000Z', netWorth: 73000 },
    { id: 2, userId: 1, date: '2021-04-10T10:15:00.000Z', netWorth: 73005 },
    { id: 3, userId: 1, date: '2021-04-10T10:30:00.000Z', netWorth: 73025 },
    { id: 4, userId: 2, date: '2021-04-10T10:00:00.000Z', netWorth: 23400 },
    { id: 5, userId: 2, date: '2021-04-10T10:15:00.000Z', netWorth: 23500 },
    { id: 6, userId: 2, date: '2021-04-10T10:30:00.000Z', netWorth: 22700 },
    { id: 7, userId: 3, date: '2021-04-10T10:00:00.000Z', netWorth: 18000 },
    { id: 8, userId: 3, date: '2021-04-10T10:15:00.000Z', netWorth: 18500 },
    { id: 9, userId: 3, date: '2021-04-10T10:30:00.000Z', netWorth: 18525 },
    { id: 10, userId: 4, date: '2021-04-10T10:00:00.000Z', netWorth: 45500 },
    { id: 11, userId: 4, date: '2021-04-10T10:15:00.000Z', netWorth: 45020 },
    { id: 12, userId: 4, date: '2021-04-10T10:30:00.000Z', netWorth: 45300 },
    { id: 13, userId: 5, date: '2021-04-10T10:00:00.000Z', netWorth: 2500 },
    { id: 14, userId: 5, date: '2021-04-10T10:15:00.000Z', netWorth: 2555 },
    { id: 15, userId: 5, date: '2021-04-10T10:30:00.000Z', netWorth: 2320 },

];

const seed = () => {
    return db.sequelize.sync({ force: true })
        .then(() => {
            // Create all the entries
            let userPromises = USERS.map(u => User.create(u));
            let stockPromises = STOCKS.map(s => Stock.create(s));
            let transactionPromises = TRANSACTIONS.map(t => Transaction.create(t));
            let portfolioPromises = PORTFOLIOS.map(p => Portfolio.create(p));
            let holdingPromises = HOLDINGS.map(hd => Holding.create(hd));
            let historyPromises = HISTORIES.map(ht => History.create(ht));
            return Promise.all([...userPromises, ...stockPromises, ...transactionPromises, ...holdingPromises, ...portfolioPromises, ...historyPromises]);
        })
}

module.exports = seed;