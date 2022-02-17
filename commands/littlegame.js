const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('littlegame')
		.setDescription('來玩小遊戲吧:v'),
	async execute(interaction) {
		interaction.reply("此功能尚未啟用:v")
	},
};