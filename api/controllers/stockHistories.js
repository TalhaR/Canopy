const express = require('express');
const router = express.Router();
const db = require('../models');
const { StockHistory } = db;

// Get all historical prices.
router.get('/', (req, res) => {
    StockHistory.findAll({})
        .then(stockHistories => res.json(stockHistories));
});

// Get all historical prices of a stock.
router.get('/:stockId', async(req, res) => {
    const { stockId } = req.params;
    try {
        stockHistories = await StockHistory.findAll({
            where: { stockId: stockId }
        })
        res.json(stockHistories);
    }
    catch (err) {
        console.log(err);
    }
});

module.exports = router;