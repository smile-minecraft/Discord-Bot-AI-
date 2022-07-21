const { SlashCommandBuilder, EmbedBuilder } = require('@discordjs/builders');
const { color } = require('../../json/util.json');
module.exports = {
	data: new SlashCommandBuilder()
		.setName('stop')
		.setDescription('停止播放'),
	async execute(client,interaction) {
        const queue = client.player.getQueue(interaction.guild.id);
        if (!queue) {
            interaction.reply({ content: '❌ | 沒有正在播放的音樂' });
        }
        queue.destroy();
        const embed = new EmbedBuilder()
        .setColor(color.lightred)
        .setTitle('🔴 | 已停止播放')
        .setTimestamp()
        .toJSON();
    await interaction.reply({ embeds:[embed] });
	},
};