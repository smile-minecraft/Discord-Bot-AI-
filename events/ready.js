const db = require('../database/database.js');
const user = require('../database/models/user.js');
module.exports = {
	name: 'ready',
	once: true,
	execute(client) {
		require('../deploy-commands');
        console.log(` ${client.user.tag}已登入!`);
		db.authenticate()
        .then(() => {
            console.log('資料庫登入成功!');
        })
        .catch(err => console.log(err));
		user.sync();
		console.log('模型同步完成');
	},
};