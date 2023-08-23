const express = require('express');
const GameRouter = express.Router();

const Game = require('../models/game')
var ctrlGame = require('../controllers/game.controller');

GameRouter.get('/', function (req, res) {
    Game.find({})
    .then(game => res.send(game))
    .catch((error) => console.log(error))
});

GameRouter.get('/check', function (req, res) {
    res.send('games works!');
});

GameRouter.get('/user/:userID', ctrlGame.getPuzzlesByUser);

GameRouter.get('/:puzzleID/score', ctrlGame.getScoresByGame)

GameRouter.get('/:id/seq/:boardSeq', ctrlGame.checkWin);

GameRouter.post('', ctrlGame.savePuzzle )

GameRouter.post('/score',ctrlGame.saveScore)

GameRouter.get('/:id/', ctrlGame.getPuzzleByID);

GameRouter.get('/:Width/:Height', ctrlGame.getPuzzleBySize, ctrlGame.calculateHints);

module.exports = GameRouter;