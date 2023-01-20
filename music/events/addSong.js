const logger = require('../../utils/console/logger.js');
module.exports = {
	name: 'addSong',
	execute(client,queue,song) {
		queue.textChannel.send(
			` ${song.name} - \`${song.formattedDuration}\` 加入歌單， by ${song.user}`,
		);
		logger.info(` ${song.name} - \`${song.formattedDuration}\` 加入歌單， by ${song.user.username}`);
	},
};