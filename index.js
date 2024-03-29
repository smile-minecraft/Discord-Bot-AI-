/* eslint-disable no-mixed-spaces-and-tabs */
require('dotenv').config();
const { Client, GatewayIntentBits, Partials } = require('discord.js');
const { MessageEmbed, Collection } = require('discord.js');
const { DisTube } = require('distube');
const logger = require('./utils/console/logger.js');

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
client.modals = new Collection();
client.buttons = new Collection();
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

// #region 讀取modal組件

const modalFiles = fs.readdirSync('./interactions/modals');
	for (const file of modalFiles) {
		const modal = require(`./interactions/modals/${file}`);
		client.modals.set(modal.data.name, modal);
		logger.info(`輸入組件 ${modal.data.name} 載入!`);
	}
// #endregion

// #region 讀取按鈕組件

const buttonFiles = fs.readdirSync('./interactions/buttons');
	for (const file of buttonFiles) {
		const button = require(`./interactions/buttons/${file}`);
		client.buttons.set(button.data.name, button);
		logger.info(`按鈕組件 ${button.data.name} 載入!`);
	}
// #endregion

// #region 音樂系統
	client.player = new DisTube(client, {
	searchSongs: 5,
	searchCooldown: 30,
	leaveOnEmpty: true,
	leaveOnFinish: true,
	leaveOnStop: true,
	emptyCooldown: 30,
});

const musicEventFiles = fs.readdirSync('./music/events').filter(file => file.endsWith('.js'));

for (const file of musicEventFiles) {
	const event = require(`./music/events/${file}`);

		client.player.on(event.name, (...args) => event.execute(client,...args));
		logger.info('偵測歌曲播放事件: ' + event.name);
}

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
	logger.info('偵測事件: ' + file);
}
// #endregion


client.login(token);

module.exports = client;