const mongoose = require('mongoose');
const { database } = require('../json/config.json');
module.exports = {
	name: 'ready',
	once: true,
	execute(client) {
		require('../deploy-commands');
        console.log(` ${client.user.tag}已登入!`);
		// require('../database/DB-Connect');
	},
};