const mongoose = require('mongoose');
const connection = require('./DB-Connect');

// 建立schema
const Player = new mongoose.Schema({
   name: String,
   userID: String,
   info: String,
   Donator: Boolean,
   NickName: String,
});

module.exports = Player;

