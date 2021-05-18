const express = require('express');
const router = express.Router();
const db = require('../models');
const { PortfolioHistory } = db;

// Get all historical portfolio data.
router.get('/', (req, res) => {
    PortfolioHistory.findAll({})
        .then(portfolioHistories => res.json(portfolioHistories));
});

// Get all historical portfolio data of a specific user.
router.get('/:userId', async(req, res) => {
    const { userId } = req.params;
    try {
        portfolioHistory = await PortfolioHistory.findAll({
            where: { userId: userId }
        })

        date = [];
        netWorth = [];
        dateAndNetWorth = [];

        for (i = 0; i < portfolioHistory.length; i++) {
            date.push(portfolioHistory[i]["dataValues"]["date"]);
            netWorth.push(portfolioHistory[i]["dataValues"]["netWorth"]);
        }

        for (i = 0; i < portfolioHistory.length; i++) {
            dateAndNetWorth.push({"date": date[i], "netWorth": netWorth[i]});
        }

        res.json(dateAndNetWorth);
    }
    catch (err) {
        console.log(err);
    }
});

module.exports = router;