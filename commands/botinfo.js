const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const help = require("../json/config.json")
module.exports = {
	data: new SlashCommandBuilder()
		.setName('botinfo')
		.setDescription('有關機器人的資訊'),
	async execute(interaction) {
		const embed = new MessageEmbed()
			.setColor('#00FFFF')
			.setTitle('機器人資訊')
			.setDescription(`🔍${help}`)
			.setThumbnail('')
			.setTimestamp()
	await interaction.reply({embeds:[embed]});
	},
};