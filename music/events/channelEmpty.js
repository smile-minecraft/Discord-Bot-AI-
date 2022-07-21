module.exports = {
	name: 'channelEmpty',
	execute(client,queue) {
        queue.metadata.channel.send("❌ | 語音頻道沒有人，因此自動離開語音頻道");
	},
};