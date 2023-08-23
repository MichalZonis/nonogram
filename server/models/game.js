const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: true
    },
    Author: {
        type: String,
        required: true
    },
    CreationTime: {
        type: Date,
        required: true
    },
    Sequence: {
        type: String,
        required: true
    },
    Width: {
        type: Number,
        required: true
        },
    Height: {
        type: Number,
        required: true
    }
});

const game = mongoose.model("game", gameSchema);

module.exports = game;