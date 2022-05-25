const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, User } = require('discord.js');
const { color } = require('../json/util.json');
const fs = require('fs')
const { time } = require('@discordjs/builders');
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
		await interaction.deferReply();
		let target = interaction.options.getUser('用戶');
		let targetid = target.id;
		let targetname = target.username;
		let targetavatar = target.avatarURL();

		let user = interaction.guild.members.fetch(targetid);
		let times = time(user.joinedTimestamp);

	const userProfile = new MessageEmbed()
		.setColor(color.blue)
		.setTitle(`用戶${targetname}的自我介紹`)
		.addField('資訊',`**用戶名稱**:${targetname}`)
		.addField("ID",`${targetid}`)
		.setThumbnail(targetavatar)
		.setTimestamp()
		await interaction.editReply({embeds:[userProfile]});
	},
};