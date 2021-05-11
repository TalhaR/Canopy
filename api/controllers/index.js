const express = require('express');
const router = express.Router();
const auth = require('../middlewares/authentication');

// Load each controller
const postsController = require('./posts.js');
const stocksController = require('./stocks.js');
const appConfigController = require('./appConfig.js');

// Mount each controller under a specific route. These
// will be prefixes to all routes defined inside the controller

router.use('/', require('./home')); //welcome apge
router.use('/auth', require('./auth'));

router.use('/home', auth.loginRequired, require('./home')); //main page
router.use('/posts', auth.loginRequired, postsController);
// router.use('/stocks', auth.loginRequired, stocksController);
router.use('/stocks', stocksController);
router.use('/application-configuration', auth.loginRequired, appConfigController);
module.exports = router;