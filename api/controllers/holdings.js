const express = require('express');
const router = express.Router();
const db = require('../models');
const { Holding } = db;

// Get all holdings.
router.get('/', (req, res) => {
    Holding.findAll({})
        .then(holdings => res.json(holdings));
});

// Get all holdings by a user.
router.get('/user/:userId', (req, res) => {
    const { userId } = req.params;
    Holding.findAll({
        where: { userId: userId }
    })
        .then(holding => {
            if (!holding) {
                return res.sendStatus(404);
            }
            res.json(holding);
        });
});

module.exports = router;