module.exports = {
	name: 'ready',
	once: true,
	execute(client) {
		require('../deploy-commands');
        console.log(` ${client.user.tag}已登入!`);
	},
};