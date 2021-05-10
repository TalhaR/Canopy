const express = require('express');
const router = express.Router();
const db = require('../models');
const { History } = db;

// Get all historical records of user portfolios.
router.get('/', (req, res) => {
    History.findAll({})
        .then(histories => res.json(histories));
});

// Get a historical portfolio data by a user.
router.get('/user/:userId', (req, res) => {
    const { userId } = req.params;
    History.findAll({
        where: { userId: userId }
    })
        .then(history => {
            if (!history) {
                return res.sendStatus(404);
            }
            res.json(history);
        });
});

module.exports = router;