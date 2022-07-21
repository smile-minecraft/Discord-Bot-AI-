const connection = require('./DB-Connect');
const Player = require('./Player');

const PlayerModel = connection.model('Player', Player);

module.exports = PlayerModel;