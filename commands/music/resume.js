const { SlashCommandBuilder, EmbedBuilder } = require('@discordjs/builders');
const { color } = require('../../json/util.json');
module.exports = {
        useDefer: true,
	data: new SlashCommandBuilder()
		.setName('resume')
		.setDescription('繼續播放'),
	async execute(client,interaction) {
        client.player.getQueue(interaction.guild.id).setPaused(false);
        const embed = new EmbedBuilder()
        .setColor(color.lightgreen)
        .setTitle('🟢 | 繼續播放歌曲')
        .setDescription(`${client.player.getQueue(interaction.guild.id).nowPlaying().title}`)
        .setTimestamp()
        .toJSON();
	await interaction.editReply({ embeds:[embed] });
	},
};