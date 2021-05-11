const express = require('express');
const morgan = require('morgan');
const path = require('path');
const db = require('./models');
const seed = require('./seed');
const app = express();
const PORT = process.env.PORT;

// Access Body Data
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//auth
const expressSession = require('express-session');
const passport = require('./middlewares/authentication');

// Enable sessions & passport
app.use(expressSession(({ secret: 'keyboard cat', resave: false, saveUninitialized: true })));
app.use(passport.initialize());
app.use(passport.session());

app.set('view engine', 'jade');

// Load Views
// const handlebars = require('express-handlebars');
// app.engine('handlebars', handlebars({
//     layoutsDir: './api/views/layouts',
//     defaultLayout: 'main',
// }));
// app.set('view engine', 'handlebars');
// app.set('views', `${__dirname}/views/`);

// this lets us parse 'application/json' content in http requests
app.use(express.json());

// add http request logging to help us debug and audit app use
const logFormat = process.env.NODE_ENV === 'production' ? 'combined' : 'dev';
app.use(morgan(logFormat));

// this mounts controllers/index.js at the route `/api`
app.use('/api', require('./controllers'));

// for production use, we serve the static react build folder
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/build')));

    // all unknown routes should be handed to our react app
    app.get('*', function(req, res) {
        res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
    });
}

// update DB tables based on model updates. Does not handle renaming tables/columns
// NOTE: toggling this to true drops all tables (including data)
db.sequelize.sync({ force: false })
    .then(() => {
        app.listen(PORT);
    });

const seedDB = async() => {
    try {
        await seed();
    } catch (err) {
        console.error('syncDB error:', err);
    }
}

seedDB();

// start up the server
if (PORT) {
    app.listen(PORT, () => console.log(`Listening on ${PORT}`));
} else {
    console.log("===== ERROR ====\nCREATE A .env FILE!\n===== /ERROR ====")
}