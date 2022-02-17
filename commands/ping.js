const { SlashCommandBuilder } = require('@discordjs/builders');
const { Client, Intents, SelectMenuInteraction,Collection } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });//這裡定義監聽器的基本功能
module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('機器人的調用延遲'),
	async execute(interaction) {
        interaction.reply(`🏓 延遲 +${Date.now() - interaction.createdTimestamp} ms\n - API 調用延遲 +${Math.round(client.ws.ping)} ms`);		    
	},
};