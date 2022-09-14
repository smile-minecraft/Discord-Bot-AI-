const { SlashCommandBuilder, EmbedBuilder } = require('@discordjs/builders');
const { color } = require('../../json/util.json');
module.exports = {
        useDefer: true,
	data: new SlashCommandBuilder()
		.setName('pause')
		.setDescription('暫停音樂'),
	async execute(client,interaction) {
                const queue = client.player.getQueue(interaction.guild.id);

                if (!queue) {
                    interaction.editReply({ content: '❌ | 沒有正在播放的音樂' });
                    return;
                }
        queue.setPaused(true);
        const embed = new EmbedBuilder()
        .setColor(color.lightyellow)
        .setTitle('🟡 | 已暫停歌曲')
        .setDescription(`${client.player.getQueue(interaction.guild.id).nowPlaying().title}`)
        .setTimestamp()
        .toJSON();
	await interaction.reply({ embeds:[embed] });
	},
};