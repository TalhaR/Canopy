const express = require('express');
const router = express.Router();


// Load each controller
const appConfigController = require('./appConfig.js');
const usersController = require('./users.js');
const stocksController = require('./stocks.js');
const transactionsController = require('./transactions.js');
const holdingsController = require('./holdings.js');
const portfoliosController = require('./portfolios.js');
const historiesController = require('./histories.js');

// Mount each controller under a specific route. These
// will be prefixes to all routes defined inside the controller
router.use('/application-configuration', appConfigController);
router.use('/users', usersController);
router.use('/stocks', stocksController);
router.use('/transactions', transactionsController);
router.use('/holdings', holdingsController);
router.use('/portfolios', portfoliosController);
router.use('/histories', historiesController);

module.exports = router;