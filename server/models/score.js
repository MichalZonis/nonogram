const mongoose = require('mongoose');
const user = mongoose.model('User').schema
const puzzle = mongoose.model('game').schema


const scoreSchema = new mongoose.Schema({
    Player: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    Time: {
        type: Number,
        required: true
    },
    Puzzle: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'game'
    }
});

const score = mongoose.model("score", scoreSchema);

module.exports = score;