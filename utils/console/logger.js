const chalk = require('chalk');
const { color } = require('../../json/util.json');
const discordConsole = require('../console/discordConsole.js');

module.exports = {

    info(message) {
    console.log("[" + chalk.green("INFO") + "] " + message);
},

    warn(message) {
    console.log("[" + chalk.yellow("WARN") + "] " + message);
},

    error(message) {
    console.log("[" + chalk.red("ERROR") + "] " + message);
},

    join(message) {
    console.log("[" + chalk.blue("JOIN") + "] " + message);
},

    leave(message) {
    console.log("[" + chalk.magenta("LEAVE") + "] " + message);
},
};