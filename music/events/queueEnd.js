module.exports = {
	name: 'queueEnd',
	execute(client,queue) {
        queue.metadata.channel.send("🎶 | 播放完畢!");
		console.log("🎶 | 播放完畢!");
	},
};