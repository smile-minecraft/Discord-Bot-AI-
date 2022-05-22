const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, User } = require('discord.js');
const fs = require('fs')
module.exports = {
	data: new SlashCommandBuilder()
		.setName('profile')
		.setDescription('你專屬的自我介紹頁面')
		.addUserOption(option =>
			option.setName('用戶')
			.setDescription('你想要查看的對象')
			.setRequired(true))
		,
	async execute(client,interaction) {
		

	},
};