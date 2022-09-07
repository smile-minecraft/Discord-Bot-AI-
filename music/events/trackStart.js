module.exports = {
	name: 'trackStart',
	execute(client,queue,track) {
        queue.metadata.channel.send(`🎶 | 現在播放 **${track.title}**!`);
		console.log(`🎶 | 現在播放 **${track.title}**!`);
	},
};