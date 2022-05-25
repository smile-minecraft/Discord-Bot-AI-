const { Client, Intents, SelectMenuInteraction,Collection } = require('discord.js');
const { MessageActionRow, MessageSelectMenu } = require('discord.js');
const { MessageEmbed } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES,Intents.FLAGS.GUILD_MEMBERS,Intents.FLAGS.GUILD_MESSAGE_REACTIONS,Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,Intents.FLAGS.GUILD_VOICE_STATES] });//這裡定義監聽器的基本功能
const { token, guildId } = require('./json/config.json');
const { help } = require('./json/config.json');
const fs = require('fs');
const { userMention } = require('@discordjs/builders');
const { color } = require('./json/util.json');
client.commands = new Collection();

//#region 讀取commands指令
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.data.name, command);
}
//#endregion

//#region 音樂系統
const { DisTube } = require('distube');
const { SpotifyPlugin } = require('@distube/spotify');

client.distube = new DisTube(client,{
	emitNewSongOnly: true,
	leaveOnFinish: true,
	leaveOnEmpty: true,
	emitAddSongWhenCreatingQueue: true,
	plugins: [new SpotifyPlugin()],
});

const status = queue =>
  `音量: \`${queue.volume}%\` | 篩選: \`${queue.filters.join(', ') || '關閉'}\` | 循環: \`${
    queue.repeatMode ? (queue.repeatMode === 2 ? '所有歌曲' : '這首歌曲') : '關閉'
  }\` | 自動播放: \`${queue.autoplay ? '開啟' : '關閉'}\``
client.distube
  .on('playSong', (queue, song) =>
    queue.textChannel.send({embeds:[
		new MessageEmbed()
		.setColor(color.lightorange)
		.setTitle(`🎵 正在播放 \`${song.name}\` - \`${song.formattedDuration}\`\n點歌的人: ${
			song.user.username
		  }\n${status(queue)}`)
		.setThumbnail('https://i.imgur.com/iTVH3mM.png')
	]})
  )
  .on('addSong', (queue, song) =>
    queue.textChannel.send({embeds:[
		new MessageEmbed()
		.setColor(color.skyblue)
		.setTitle(`🎵 添加 ${song.name} - \`${song.formattedDuration}\` 到播放清單 by ${song.user.username}`)
		.setThumbnail('https://i.imgur.com/iTVH3mM.png')
	]})
    
  )
  .on('addList', (queue, playlist) =>
    queue.textChannel.send({embeds:[
		new MessageEmbed()
		.setColor(color.skyblue)
		.setTitle(`🎵 添加 ${song.name} - \`${song.formattedDuration}\` 到播放清單 by ${song.user.displayName}`)
		.setThumbnail('https://i.imgur.com/iTVH3mM.png')
	]})
    
  )
  .on('error', (channel, e) => {
    channel.send({embeds:[
		new MessageEmbed()
		.setColor(color.red)
		.setTitle(`發生錯誤: ${e.toString().slice(0, 1974)}`)]})
    console.error(e)
  })
  .on('empty', channel => channel.send(
	{embeds:[
		new MessageEmbed()
		.setColor(color.red)
		.setTitle('🎵 沒有人了，阿姨我要下班了')
		.setThumbnail('https://i.imgur.com/iTVH3mM.png')]})
		  )
  .on('searchNoResult', (message, query) =>
    message.channel.send(
	{embeds:[
		new MessageEmbed()
		.setColor(color.red)
		.setTitle(`🎵 找不到 \`${query}\`的結果!`)
		.setThumbnail('https://i.imgur.com/iTVH3mM.png')]})
	
  )
  .on('finish', queue => queue.textChannel.send(
	{embeds:[
		new MessageEmbed()
		.setColor(color.lightgreen)
		.setTitle('🎵 播放完畢!')
		.setThumbnail('https://i.imgur.com/iTVH3mM.png')]})
		  )
  

//#endregion

//#region 單獨讀取事件文件
const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const event = require(`./events/${file}`);
	if (event.once) {
		client.once(event.name,async (...args) => event.execute(client,...args));
	} else {
		client.on(event.name,async (...args) => event.execute(client,...args));
	}
}
//#endregion





client.login(token);