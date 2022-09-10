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

const modalFiles = fs.readdirSync('./modals');
	for (const file of modalFiles) {
		const modal = require(`./modals/${file}`);
		client.modals.set(modal.data.name, modal);
		console.log(`輸入組件 ${modal.data.name} 載入!`);
	}
// #endregion

// #region 讀取按鈕組件

const buttonFiles = fs.readdirSync('./buttons');
	for (const file of buttonFiles) {
		const button = require(`./buttons/${file}`);
		client.buttons.set(button.data.name, button);
		console.log(`按鈕組件 ${button.data.name} 載入!`);
	}
// #endregion

// #region 音樂系統
client.player = new Player(client);

const musicEventFiles = fs.readdirSync('./music/events').filter(file => file.endsWith('.js'));

for (const file of musicEventFiles) {
	const event = require(`./music/events/${file}`);

		client.player.on(event.name, (...args) => event.execute(client,...args));
		console.log('偵測歌曲播放事件: ' + event.name);
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
	console.log('偵測事件: ' + file);
}
// #endregion


client.login(token);