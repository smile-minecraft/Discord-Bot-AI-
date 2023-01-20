const logger = require('../../utils/console/logger.js');
module.exports = {
	name: 'addList',
	execute(client,queue,playlist) {
        queue.textChannel.send(
			`將 \`${playlist.name}\` 播放清單 (${playlist.songs.length} 首歌曲) 加入歌單!`,
		);
		logger.info(`將 \`${playlist.name}\` 播放清單 (${playlist.songs.length} 首歌曲) 加入歌單!`);
	},
};