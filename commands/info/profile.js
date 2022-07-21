const { SlashCommandBuilder, EmbedBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const { color } = require('../../json/util.json');
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
		const target = interaction.options.getUser('用戶');
		const targetid = target.id;
		const targetname = target.username;
		const targetavatar = target.avatarURL();

	const userProfile = new EmbedBuilder()
		.setColor(color.blue)
		.setTitle(`用戶 ${targetname} 的自我介紹`)
		.addField('資訊',`**用戶名稱**:${targetname}`)
		.addField("ID",`${targetid}`)
		.setThumbnail(targetavatar)
		.setTimestamp();
		await interaction.editReply({ embeds:[userProfile] });
	},
};