const bcrypt = require('bcrypt-nodejs');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const Users = require('../models').User;

function passwordsMatch(passwordSubmitted, storedPassword) {
    return bcrypt.compareSync(passwordSubmitted, storedPassword);
}

passport.use(new LocalStrategy({
        usernameField: 'email',
    },
    (email, password, done) => {
        Users.findOne({
            where: { email },
        }).then((user) => {
            debugger;

            if (!user) {
                return done(null, false, { message: 'Incorrect email.' });
            }
            console.log(password);
            if (passwordsMatch(password, user.password) === false) {
                console.log('\n\nerror match\n\n')
                return done(null, false, { message: 'Incorrect password.' });
            }

            console.log('\n\ncorrect login!!\n\n')
            return done(null, user, { message: 'Successfully Logged In!' });
        });
    }));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    Users.findByPk(id).then((user) => {
        if (!user) {
            return done(null, false);
        }

        return done(null, user);
    });
});

passport.redirectIfLoggedIn = (route) =>
    (req, res, next) => (req.user ? res.redirect(route) : next());

passport.redirectIfNotLoggedIn = (route) =>
    (req, res, next) => (req.user ? next() : res.redirect(route));

let authenticate = ({ type, message, redirectPath }) => {
    return (req, res, next) => {
        let isAuthenticated = req.isAuthenticated()
        if (!isAuthenticated) {
            // req.flash(type, message)
            console.log('\n\n' +
                message + '\n\n')
            return res.redirect(redirectPath)
        }
        next()
    }
}

passport.loginRequired = authenticate({
    type: 'messageFailure',
    message: 'Must be logged in',
    redirectPath: '/api/auth/login'
})

passport.signupRequired = authenticate({
    type: 'messageFailure',
    message: 'Must be signed up',
    redirectPath: '/api/auth/signup'
})


module.exports = passport;