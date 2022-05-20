const { Client, Intents, SelectMenuInteraction,Collection } = require('discord.js');
const { MessageActionRow, MessageSelectMenu } = require('discord.js');
const { MessageEmbed } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES,Intents.FLAGS.GUILD_MEMBERS,Intents.FLAGS.GUILD_MESSAGE_REACTIONS,Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS] });//這裡定義監聽器的基本功能
const { token, guildId } = require('./json/config.json');
const { help } = require('./json/config.json');
const fs = require('fs');
client.commands = new Collection();
//#region 讀取commands指令
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.data.name, command);
}
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

//#region 動態執行指令
client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	const command = client.commands.get(interaction.commandName);
	if (!command) return;

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: '執行指令發生錯誤:/', ephemeral: true });
	}
});
//#endregion



client.login(token);