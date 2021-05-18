const express = require('express');
const router = express.Router();
const db = require('../models');
const { Stock, Holding } = db;

async function convertStockIdToTicker(stockId) {
    const StockObject = await Stock.findByPk(stockId);
    ticker = StockObject.dataValues.ticker;
    return ticker;
}

// Get all holdings.
router.get('/', (req, res) => {
    Holding.findAll({})
        .then(holdings => res.json(holdings));
});

// Get all holdings by a user.
router.get('/user/:userId', async(req, res) => {
    try {
        const { userId } = req.params;
        holding = await Holding.findAll({ where: { userId: userId }});

        if (!holding.length) {
            return res.sendStatus(404);
        }
        
        stockId = [];
        tickers = [];
        quantity = [];
        portfolio = [];

        for (i = 0; i < holding.length; i++) {
            stockId.push(holding[i]["dataValues"]["stockId"]);
            quantity.push(holding[i]["dataValues"]["quantity"]);
        }

        for (i = 0; i < holding.length; i++) {
            tickers.push(await convertStockIdToTicker(stockId[i]));
        }

        for (i = 0; i < stockId.length; i++) {
            portfolio.push({"ticker": tickers[i], "quantity": quantity[i]});
        }
        res.json(portfolio);
        
    } catch (err) {
        res.status(404).json("No holdings found for the user.")
    }
});

// Add a stock holding for a user.
router.post('/user/:userId', async(req, res) => {
    let holdingId = await Holding.count() + 1;
    const { userId } = req.params;

    Holding.create({
        "id": holdingId,
        "userId": userId,
        "portfolioId": userId,
        "stockId": req.body.stockId,
        "quantity": req.body.quantity
    })
        .then(createdHolding => res.status(200).json(createdHolding))
        .catch(err => console.log(err));
});

// Update an stock holding for a user.
router.put('/user/:userId', async(req, res) => {
    try {
        const { userId } = req.params;
        await Holding.update(req.body, {where: {userId: userId, stockId: req.body.stockId}});
        let updatedHolding = await Holding.findOne({where: {userId: userId, stockId: req.body.stockId}});
        res.status(201).json(updatedHolding);
    }
    catch(err) {
        console.log(err);
    }
});

/** Delete a stock holding for a user. */
router.delete('/user/:userId', (req, res) => {
    Holding.destroy({
      where: {
        userId: req.params.userId,
        stockId: req.body.stockId
      }
    })
      .then(() => res.status(200).json("Deleted a holding."))
      .catch(err => console.log(err));
});
  

module.exports = router;