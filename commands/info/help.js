const { SlashCommandBuilder, EmbedBuilder } = require('@discordjs/builders');
const { help } = require("../../json/config.json");
const { color } = require('../../json/util.json');
module.exports = {
	data: new SlashCommandBuilder()
		.setName('help')
		.setDescription('指令的列表以及操作幫助'),
	async execute(client,interaction) {
        const embed = new EmbedBuilder()
        .setColor(color.lightblue)
        .setTitle('機器人幫助頁面')
        .setDescription(`🔍${help}`)
        .setThumbnail('https://i.imgur.com/voHZ6el.png')
        .setTimestamp();
	await interaction.reply({ embeds:[embed] });
	},
};