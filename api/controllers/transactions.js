const express = require('express');
const router = express.Router();
const db = require('../models');
const { Transaction } = db;

// Get all transactions.
router.get('/', (req, res) => {
    Transaction.findAll({})
        .then(transactions => res.json(transactions));
});

// Get a specific transaction by its id.
router.get('/id/:id', (req, res) => {
    const { id } = req.params;
    Transaction.findByPk(id)
        .then(transaction => {
            if (!transaction) {
                return res.sendStatus(404);
            }
            res.json(transaction);
        });
});

// Get all transactions by a specific user.
router.get('/user/:userId', (req, res) => {
    const { userId } = req.params;
    Transaction.findAll({
        where: { userId: userId } 
    })
        .then(transaction => {
            if (!transaction) {
                return res.sendStatus(404);
            }
            res.json(transaction);
        });
});


module.exports = router;