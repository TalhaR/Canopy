const passport = require('../middlewares/authentication');
const router = require('express').Router();
const models = require('../models');
const Users = models.User;

// router.get('/login', (req, res) => {
//     res.render('login')
// });

router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/api/',
        failureRedirect: '/api/auth/login',
    })(req, res, next);
});

router.get('/signup/', (req, res) => {
    res.render('signup')
});

router.post('/signup/', (req, res) => {
    console.log(req.body.email);
    Users.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
    }).then((user) => {
        console.log(user.email);
    }).then((user) => {
        req.login(user, () =>
            res.redirect('/profile')
        );
    }).catch((error) => {
        console.log(error);
        res.render('signup');
    });
});

router.get('/logout/', (req, res) => {
    req.logout();
    res.redirect('/api/auth/login')
});

module.exports = router;