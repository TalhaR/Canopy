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
router.post('/user/:userId', (req, res) => {
    Holding.create(req.body)
        .then(createdHolding => res.status(200).json(createdHolding))
        .catch(err => console.log(err));
});


// Update an stock holding for a user.
router.put('/user/:userId', async(req, res) => {
    try {
        const { userId } = req.params;
        await Holding.update(req.body, {where: {userId: userId, stockId: req.body.stockId}});
        let updatedHolding = await Holding.findByPk(req.params.userId);
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
        id: req.params.userId
      }
    })
      .then(() => res.status(200).json("Deleted a holding."))
      .catch(err => console.log(err));
  });
  

module.exports = router;