const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const mongoose = require('mongoose');
const dbConfig = require('./config/database.config');

const passport = require('passport');
//require('./api/models/db');
require('./config/passport');

const routes = require('./routes/base.route');
const GameRouter = require('./routes/game.route')

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// CORS
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, HEAD, OPTIONS, PUT, PATCH, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization")
    next();
})


// #region DB Connection
mongoose.connect(dbConfig.url).then(() => {
    console.log("Successfully connected to the database");
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});
// #endregion DB Connection

// #region auth
app.use(passport.initialize());
// #endregion auth

// #region routers
app.use('/', routes);

// #endregion routers


// #region error handlers
// Catch unauthorised errors
app.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
      res.status(401);
      res.json({"message" : err.name + ": " + err.message});
    }
  });
// #endregion error handlers

const port = process.env.PORT || '8000';
app.set('port', port);

const server = http.createServer(app); 

server.listen(port, function () {
    console.info(`Server is up and running on port ${port}`)
});