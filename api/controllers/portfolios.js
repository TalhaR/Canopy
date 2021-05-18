const express = require('express');
const router = express.Router();
const db = require('../models');
const { Portfolio } = db;

// Get all portfolios.
router.get('/', (req, res) => {
    Portfolio.findAll({})
        .then(portfolio => res.json(portfolio));
});

// Get the portfolio of a specific user.
router.get('/:userId', (req, res) => {
    const { userId } = req.params;
    Portfolio.findOne({
        where: { userId: userId }
    })
        .then(portfolio => {
            if (!portfolio) {
                return res.sendStatus(404);
            }
            res.json(portfolio);
        });
});

module.exports = router;