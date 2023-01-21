const db = require('../database/database.js');
const user = require('../database/models/user.js');
const report = require('../database/models/report.js');
const bug = require('../database/models/bug.js');
const suggest = require('../database/models/suggest.js');
const logger = require('../utils/console/logger.js');
const discordConsole = require('../utils/console/discordConsole.js');
const { color } = require('../json/util.json');

module.exports = {
	name: 'ready',
	once: true,
	execute(client) {
		require('../deploy-commands');
        logger.info(` ${client.user.tag}已登入!`);
		db.authenticate()
        .then(() => {
            logger.info('資料庫登入成功!');
        })
        .catch(err => logger.error(err));
		user.sync();
		report.sync();
		bug.sync();
		suggest.sync();

		logger.info('模型同步完成');
	},
};