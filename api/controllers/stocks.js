const express = require('express');
const router = express.Router();
const db = require('../models');
const { Stock } = db;

// This is a simple example for providing basic CRUD routes for
// a resource/model. It provides the following:
//    GET    /stocks
//    POST   /stocks
//    GET    /stocks/:id
//    PUT    /stocks/:id
//    DELETE /stocks/:id 

// Get a list of all the stocks in the database.
router.get('/', (req, res) => {
    Stock.findAll({})
        .then(stocks => res.json(stocks));
});


// Get a specific stock by its ticker. 
router.get('/:stockTicker', async (req, res) => {
    const { stockTicker } = req.params;
    try {
        const stock = await Stock.findOne({
            where: { ticker: stockTicker }
        })
        res.json(stock);
    } catch (error) {
        err => console.log(err);
        return res.status(404).json({ message: 'Stock not found' });
    }
});


// Update current price of a stock by its ticker.
router.patch('/:stockTicker', async (req, res) => {
    try {
        const { stockTicker } = req.params;
        const updatedStock = await Stock.update(
            { price: req.body.price },
            { where: { ticker: stockTicker }, returning: true }
        )
        res.json(updatedStock);
    } catch (error) {
        err => console.log(err);
        return res.status(404).json({ message: 'Stock not found' });
    }
});


// Query the Polygon.io API to update
// price, open, close, high, low, volume, market cap, P/E ratio, and dividend yield
router.put('/:stockTicker/:date/', async(req, res) => {
    try {
        const { stockTicker } = req.params;
        const { date } = req.params;
        const axios = require('axios');
        let response = await axios.get(`https://api.polygon.io/v1/open-close/${stockTicker}/${date}?apiKey=YezH1NTxZjofbNK4HCUblp5BvmrMNlLT`)
        let responseData = await response.data;
        let updatedStock = await Stock.update(
            {price: responseData["afterHours"], open: responseData["open"], high: responseData["high"], low: responseData["low"], close: responseData["close"], volume: responseData["volume"]}, 
            {where: {ticker: stockTicker}, returning: true}
        );
        res.json(updatedStock);
    }
    catch(error) {
        console.log(error);
    }
});

module.exports = router;
