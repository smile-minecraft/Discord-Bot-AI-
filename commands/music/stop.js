const { SlashCommandBuilder, EmbedBuilder } = require('@discordjs/builders');
const { color } = require('../../json/util.json');
module.exports = {
    useDefer: true,
	data: new SlashCommandBuilder()
		.setName('stop')
		.setDescription('停止播放'),
	async execute(client,interaction) {
        const queue = client.player.getQueue(interaction.guild.id);
        if (!queue || !queue.playing) {
            return interaction.editReply({ content: '❌ | 沒有正在播放的音樂' });
        }
        queue.stop();
        const embed = new EmbedBuilder()
        .setColor(color.lightred)
        .setTitle('🔴 | 已停止播放')
        .setTimestamp()
        .toJSON();
    await interaction.editReply({ embeds:[embed] });
	},
};