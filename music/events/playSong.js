const logger = require('../../utils/console/logger.js');
const { EmbedBuilder } = require('discord.js');
const { color } = require('../../json/util.json');
const discordConsole = require('../../utils/console/discordConsole.js');
module.exports = {
	name: 'playSong',
	execute(client,queue,song) {
		const embed = new EmbedBuilder()
        .setColor(color.green)
        .setTitle('播放歌曲')
        .setDescription(`播放 \`${song.name}\` - \`${song.formattedDuration}\`\n點歌的人: ${song.user}`)
        .setTimestamp();
        queue.textChannel.send(
			{ embeds:[embed] },
		);
		logger.info(`播放 \`${song.name}\` - \`${song.formattedDuration}\`，點歌的人: ${song.user.username}`);
		discordConsole.send(client,embed);
	},
};