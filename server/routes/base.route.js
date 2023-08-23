const express = require('express');
const router = express.Router();
const GameRouter = require('./game.route')
const AuthRouter = require('./auth.route')
var ctrlProfile = require('../controllers/profile.controller');
var ctrlAuth = require('../controllers/auth.controller');
var {
    expressjwt: jwt
} = require("express-jwt");

var auth = jwt({
    algorithms: ["HS256"],
    secret: 'MY_SECRET',
    userProperty: 'payload'
});

router.get('/', function (req, res) {
    res.send('API works!!!');
});

// profile
router.get('/profile', auth, ctrlProfile.profileRead, function (req, res) {
    console.log(req.auth._id)
});

// authentication
router.post('/register', ctrlAuth.register);
router.post('/login', ctrlAuth.login);

router.use('/game', auth, GameRouter);

router.get('/help/help/help', function (req, res) {
    res.send("hiiii");
    res.status(400)
})

router.get('/test', auth, function (req, res) {
    res.send("OK")
})

module.exports = router;