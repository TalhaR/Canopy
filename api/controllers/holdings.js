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