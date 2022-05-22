const mongoose = require('mongoose');
const { database } = require('../json/config.json');
module.exports = {
	name: 'ready',
	once: true,
	execute(client) {
		require('../deploy-commands');
        console.log(` ${client.user.tag}已登入!`);
		if(!database){
			console.log("找不到資料庫連結");
			return;
		}
		mongoose.connect(database, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			}
		).then(() => {
			console.log('MongoDB 連線成功!');
		}).catch(err => {
			console.log('MongoDB 連線失敗!', err);
		});
	},
};