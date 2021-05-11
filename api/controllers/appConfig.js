const express = require('express');
const router = express.Router();

router.get('login/', (req, res) => {
    res.render('login');
});

router.post('login/', (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/api/',
        failureRedirect: '/api/login',
    })(req, res, next);
});


module.exports = router;