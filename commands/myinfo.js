const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
module.exports = {
	data: new SlashCommandBuilder()
		.setName('myinfo')
		.setDescription('有關你的資訊'),
	async execute(interaction) {                
	await interaction.reply("還沒啟用.w.");
	},
};