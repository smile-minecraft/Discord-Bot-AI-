const { inlineCode } = require('@discordjs/builders');
const logger = require('../../utils/console/logger.js');
const { EmbedBuilder } = require('discord.js');
const { color } = require('../../json/util.json');
const discordConsole = require('../../utils/console/discordConsole.js');
module.exports = {
	name: 'error',
	execute(client,channel,error) {
		const embed = new EmbedBuilder()
        .setColor(color.red)
        .setTitle('發生錯誤')
		.addFields(
			{ name: '錯誤', value: inlineCode(error.message), inline: true },
		)
        .setTimestamp();
		logger.error(error);
		discordConsole.send(client,embed);
		if (channel) channel.send({ embeds:[embed] });
	},
};