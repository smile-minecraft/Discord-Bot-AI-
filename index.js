/* eslint-disable no-mixed-spaces-and-tabs */
require('dotenv').config();
const { Client, GatewayIntentBits, Partials } = require('discord.js');
const { MessageEmbed, Collection } = require('discord.js');
const { Player } = require("discord-player");

const client = new Client(
	{ intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMembers,
		GatewayIntentBits.GuildBans,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.GuildMessageReactions,
		GatewayIntentBits.DirectMessages,
		GatewayIntentBits.DirectMessageReactions,
		GatewayIntentBits.GuildMessageTyping,
		GatewayIntentBits.GuildVoiceStates,
		] }); // 這裡定義監聽器的基本功能
const { token, guildId } = process.env;
const fs = require('fs');
const { color } = require('./json/util.json');
client.commands = new Collection();

// #region 讀取commands指令

const commandFolders = fs.readdirSync('./commands');
for (const folder of commandFolders) {
    const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));
    for (const file of commandFiles) {
        const command = require(`./commands/${folder}/${file}`);
        client.commands.set(command.data.name, command);
    }
}

// #endregion

// #region 音樂系統
client.player = new Player(client);

const musicEventFiles = fs.readdirSync('./music/events').filter(file => file.endsWith('.js'));

for (const file of musicEventFiles) {
	const event = require(`./music/events/${file}`);

		client.player.on(event.name, (...args) => event.execute(client,...args));
		console.log('載入事件: ' + event.name);
}

/* const { DisTube } = require('distube');
const { SpotifyPlugin } = require('@distube/spotify');

client.distube = new DisTube(client,{
	emitNewSongOnly: true,
	leaveOnFinish: true,
	leaveOnEmpty: true,
	emitAddSongWhenCreatingQueue: true,
	youtubeDL: false,
	plugins: [new SpotifyPlugin()],
});

const status = queue =>
	`音量: \`${queue.volume}%\` | 篩選: \`${queue.filters.join(', ') || '關閉'}\` | 循環: \`${
		queue.repeatMode ? (queue.repeatMode === 2 ? '所有歌曲' : '這首歌曲') : '關閉'
	}\` | 自動播放: \`${queue.autoplay ? '開啟' : '關閉'}\``;
client.distube
	.on('playSong', (queue, song) =>
		queue.textChannel.send({ embeds:[
			new MessageEmbed()
				.setColor(color.lightorange)
				.setTitle(`🎵 正在播放 \`${song.name}\` - \`${song.formattedDuration}\`\n點歌的人: ${
					song.user.username
		  }\n${status(queue)}`)
				.setThumbnail('https://i.imgur.com/iTVH3mM.png'),
		] }),
	)
	.on('addSong', (queue, song) =>
		queue.textChannel.send({ embeds:[
			new MessageEmbed()
				.setColor(color.skyblue)
				.setTitle(`🎵 添加 ${song.name} - \`${song.formattedDuration}\` 到播放清單 by ${song.user.username}`)
				.setThumbnail('https://i.imgur.com/iTVH3mM.png'),
		] }),
	)
	.on('addList', (queue, playlist) =>
		queue.textChannel.send({ embeds:[
			new MessageEmbed()
				.setColor(color.skyblue)
				.setTitle(`🎵 添加 ${song.name} - \`${song.formattedDuration}\` 到播放清單 by ${song.user.displayName}`)
				.setThumbnail('https://i.imgur.com/iTVH3mM.png'),
		] }),
	)
	.on('error', (channel, e) => {
		channel.send({ embeds:[
			new MessageEmbed()
				.setColor(color.red)
				.setTitle(`發生錯誤`)
				.setDescription(`${e.toString().slice(0, 1974)}`)] });
		console.error(e);
	})
	.on('empty', channel => channel.send(
		{ embeds:[
			new MessageEmbed()
				.setColor(color.red)
				.setTitle('🎵 沒有人了，阿姨我要下班了')
				.setThumbnail('https://i.imgur.com/iTVH3mM.png')] }),
		  )
	.on('searchNoResult', (message, query) =>
		message.channel.send(
			{ embeds:[
				new MessageEmbed()
					.setColor(color.red)
					.setTitle(`🎵 找不到 \`${query}\`的結果!`)
					.setThumbnail('https://i.imgur.com/iTVH3mM.png')] }),

	)
	.on('finish', queue => queue.textChannel.send(
		{ embeds:[
			new MessageEmbed()
				.setColor(color.lightgreen)
				.setTitle('🎵 播放完畢!')
				.setThumbnail('https://i.imgur.com/iTVH3mM.png')] }),
		  );

*/
// #endregion

// #region 單獨讀取事件文件
const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const event = require(`./events/${file}`);
	if (event.once) {
		client.once(event.name,async (...args) => event.execute(client,...args));
	}
 else {
		client.on(event.name,async (...args) => event.execute(client,...args));
	}
}
// #endregion


client.login(token);