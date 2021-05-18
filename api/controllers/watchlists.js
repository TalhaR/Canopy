const express = require('express');
const router = express.Router();
const db = require('../models');
const { Watchlist } = db;


/** Get a list of all the stocks in the user's watchlist. **/
router.get('/:userId', async(req, res) => {
    try {
    const { userId } = req.params;
    watchlistObject = await Watchlist.findByPk(userId)
    tickersArray = watchlistObject["dataValues"]["tickers"];
    tickersResponse = {"Watchlist": tickersArray};

    res.json(tickersResponse);
    } catch(err) {
        console.log(err);
    }
});

/** Edit the user's watchlist **/
router.put('/:userId', async(req, res) => {
    const { userId } = req.params;
    try {
        await Watchlist.update({tickers: req.body.tickers}, {where: {userId: userId}});
        let updatedWatchlist = await Watchlist.findOne({where: {userId: userId}});
        res.status(201).json(updatedWatchlist);
    }
    catch(err) {
        console.log(err);
    }
});

module.exports = router;
