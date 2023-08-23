var mongoose = require('mongoose');
const score = require('../models/score');
const Game = mongoose.model('game');
const Score = require('../models/score');
const states = require('../enums/states.enum');

module.exports.savePuzzle = function (req, res) {

    if (req.auth._id != req.body.newGame.Author) {
        res.status.res(401).json({
            "message": "UnauthorizedError: Credentials mismatch"
        });
    } else {
        var newPuzzle = new Game();
        newPuzzle.Name = req.body.newGame.Name
        newPuzzle.Author = req.auth._id
        newPuzzle.CreationTime = new Date(req.body.newGame.CreationTime)
        newPuzzle.Sequence = req.body.newGame.Sequence
        newPuzzle.Height = req.body.newGame.Height
        newPuzzle.Width = req.body.newGame.Width

        console.log(newPuzzle)
        newPuzzle.save(function (err) {
            res.status(200);
            res.json({
                "new-puzzle": newPuzzle
            });
        });
    }
};

module.exports.getPuzzlesByUser = function (req, res) {
    Game.find({
            "Author": req.params.userID
        })
        // .select('_id')
        .then(puzzles => {
            //puzzles = puzzles.map(puzzle => puzzle._id)
            res.send(puzzles)
        })
        .catch((error) => console.log(error))
};

module.exports.getPuzzleBySize = function (req, res, next) {
    Game.aggregate([{
                $match: {
                    "Width": parseInt(req.params.Width),
                    "Height": parseInt(req.params.Height)
                }
            },
            {
                $sample: {
                    size: 1
                }
            }
        ])
        .then(games => {
            req.puzzle = games[0]
            next()
            // res.send(games[0])
        })
        .catch((error) => {
            console.log(error)
            res.send(error)
        })


}

module.exports.getPuzzleByID = function (req, res) {
    Game.findOne({
            "_id": req.params.id
        })
        .then(game => {
            res.send(game)
        })
        .catch((error) => console.log(error))
}

module.exports.checkWin = function (req, res) {
    Game.findOne({
            "_id": req.params.id
        })
        .then(game => {
            console.log(game.Sequence.localeCompare(req.params.boardSeq))
            if (game.Sequence.localeCompare(req.params.boardSeq) == 0) {
                res.send(true)
            } else {
                res.send(false)
            }

        })
        .catch((error) => console.log(error))
}

module.exports.saveScore = function (req, res) {
    if (req.auth._id != req.body.userID) {
        res.status.res(401).json({
            "message": "UnauthorizedError: Credentials mismatch"
        });
    } else {
        var newScore = new Score();
        newScore.Player = req.auth._id
        newScore.Time = req.body.score
        newScore.Puzzle = req.body.puzzleID

        newScore.save(function (err) {
            if (err) {
                console.log(err)
                res.status(500)
                res.json({
                    meesage: "error while saving the score",
                    error: err
                })
            } else {
                res.status(200);
                res.json({
                    newScore
                });
            }
        });
    }
}

module.exports.getScoresByGame = function (req, res) {
    Score.find({
            "Puzzle": {
                _id: req.params.puzzleID
            }
        })
        .sort('Time')
        .populate("Player")
        .then(scores => {
            res.send(scores)
        })
}

// TODO: refactor with new terminology
module.exports.parsePattern = function (req, res) {
    const cols = +req.params.Width
    const rows = +req.params.Height

    let grid = new Array(rows).fill("").map(() => new Array(cols).fill(states.empty))

    // if the board need to be initialized according to a sequence then blacken the cells accordingly
    if (req.grid.Sequence) {
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                //   console.log(req.grid.Sequence.charAt(cols * i + j),this.cols,  i, j, this.cols * i + j)
                if (req.grid.Sequence.charAt(cols * i + j) == states.black) {
                    grid[i][j] = states.black;
                }
            }
        }
    }
    req.grid.parsedPattern = grid
    res.send(req.grid)
}

/*module.exports.calculateRowHints = function(req,res) {
    /*score: score,
                   userID: userID,
                   puzzleID: puzzleID*/
//             console.log(req.body)
/* var score = new Score({
        Player: req.body.payload.userID,
        Time: req.body.payload.score,
        Puzzle: req.body.payload.puzzleID
    }).save(function(err) {
        res.status(200);
        res.json({
            "new-score" : score
        });
    })
    res.status(333)
};*/

module.exports.calculateHints = function (req, res) {
    const lengthsArr = [+req.params.Height, +req.params.Width]

    for (let lengthI = 0; lengthI < lengthsArr.length; lengthI++) {
        let hintGroups = new Array(lengthsArr[lengthI]);
        // calculation
        for (let i = 0; i < lengthsArr[lengthI]; i++) {
            let currGroupSize = 0;
            for (let j = 0; j < lengthsArr[lengthsArr.length - lengthI - 1]; j++) {

                if (!hintGroups[i]) hintGroups[i] = []
                const charI = (lengthI % 2 == 0) ? (+req.params.Width * i + j) : (+req.params.Width * j + i)
                //if the cell is empty
                if (req.puzzle.Sequence[charI] == states.empty) {

                    hintGroups[i].push(currGroupSize);
                    currGroupSize = 0;

                } else {
                    currGroupSize++;
                }
            }

            hintGroups[i].push(currGroupSize);

            // filter out groups of zero
            hintGroups[i] = hintGroups[i].filter((groupSize) => {
                return groupSize > 0
            })
        }

        // put in currect attr
        if (lengthI % 2 == 0) {
            req.puzzle.horizontalHints = hintGroups
        } else {
            req.puzzle.verticalHints = hintGroups
        }
    }

    res.send(req.puzzle)
}