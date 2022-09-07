module.exports = {
	name: 'botDisconnect',
	execute(client,queue) {
        queue.metadata.channel.send("🚫 | 我已經從語音頻道離線了!");
		console.log("🚫 | 我已經從語音頻道離線了!");
	},
};