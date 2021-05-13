const express = require('express');
const router = express.Router();
const db = require('../models');
const { User } = db;

// Get all registered users.
router.get('/', (req, res) => {
    User.findAll({})
        .then(users => res.json(users));
});

// Get a specific user by their id.
router.get('/:id', (req, res) => {
    const { id } = req.params;
    User.findByPk(id)
        .then(user => {
            if (!user) {
                return res.sendStatus(404);
            }
            res.json(user);
        });
});

module.exports = router;