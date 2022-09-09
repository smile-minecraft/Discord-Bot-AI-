const { SlashCommandBuilder, EmbedBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const { color } = require('../../json/util.json');
module.exports = {
	useDefer: true,
	data: new SlashCommandBuilder()
		.setName('info')
		.setDescription('群組的相關資訊'),
	async execute(client, interaction) {
		var botcount = interaction.guild.members.cache.filter(m => m.user.bot).size;
		var membercount = interaction.guild.memberCount;
		var mancount = membercount - botcount;
		const embed = new EmbedBuilder()
			.setColor(color.pink)
			.setTitle('伺服器相關資訊')
            .setDescription('伺服器名稱:' + interaction.guild.name + "\n伺服器實際人數:" + mancount)
            .setThumbnail(interaction.guild.iconURL())
            .setTimestamp();
        await interaction.editReply({ embeds:[embed] });
	},
};