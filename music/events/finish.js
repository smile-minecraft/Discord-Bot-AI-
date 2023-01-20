const logger = require('../../utils/console/logger.js');
const { EmbedBuilder } = require('discord.js');
const { color } = require('../../json/util.json');
module.exports = {
	name: 'finish',
	execute(client,queue) {
		const embed = new EmbedBuilder()
        .setColor(color.blue)
        .setTitle('播放清單結束')
        .setTimestamp();
        queue.textChannel.send({ embeds:[embed] });
		logger.info("播放清單已播放完畢!");
	},
};