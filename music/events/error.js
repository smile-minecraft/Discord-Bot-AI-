const { inlineCode } = require('@discordjs/builders');
module.exports = {
	name: 'error',
	execute(client,queue,error) {
        console.error(error.message);
        queue.metadata.channel.send("❌ | 發生錯誤，請聯絡管理員\n" + inlineCode(error.message));
	},
};