const mongoose = require ('mongoose')
const playerSchema = new mongoose.Schema({
    name: String,
    score: Number,
    playerid: String,
 
});

const Player = mongoose.model('Player', playerSchema);

module.exports = Player;