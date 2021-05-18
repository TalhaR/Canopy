const express = require('express');
const router = express.Router();
const db = require('../models');
const { StockHistory, Stock } = db;

// Get all historical prices.
router.get('/', (req, res) => {
    StockHistory.findAll({})
        .then(stockHistories => res.json(stockHistories));
});

// Get all historical prices of a stock.
router.get('/:ticker', async(req, res) => {
    const { ticker } = req.params;
    try {
        const stock = await Stock.findOne({
            where: { ticker: ticker }
        })

        stockHistories = await StockHistory.findAll({
            where: { stockId: stock["dataValues"]["id"] }
        })

        date = [];
        price = [];
        dateAndPrice = [];

        for (i = 0; i < stockHistories.length; i++) {
            date.push(stockHistories[i]["dataValues"]["date"]);
            price.push(stockHistories[i]["dataValues"]["price"]);
        }

        for (i = 0; i < stockHistories.length; i++) {
            dateAndPrice.push({"date": date[i], "price": price[i]});
        }
        res.json(dateAndPrice);
    }
    catch (err) {
        console.log(err);
    }
});

module.exports = router;