const { SlashCommandBuilder, EmbedBuilder } = require('@discordjs/builders');
const { color } = require('../../json/util.json');
const { QueueRepeatMode } = require('discord-player');
module.exports = {
    useDefer: true,
	data: new SlashCommandBuilder()
		.setName('nowplaying')
		.setDescription('查看目前正在播放的歌曲'),
	async execute(client,interaction) {
        const queue = client.player.getQueue(interaction.guild.id);

        if (!queue) {
            interaction.editReply({ content: '❌ | 沒有正在播放的音樂' });
        }
        const progress = queue.createProgressBar();
        const perc = queue.getPlayerTimestamp();
        const view = queue.current.views;
        const embed = new EmbedBuilder()
        .setColor(color.lightnavy)
        .setTitle('正在播放:')
        .setDescription(`🎶 | **${queue.current.title}**! (\`${perc.progress == 'Infinity' ? 'Live' : perc.progress + '%'}\`)`)
        .setTimestamp()
        .addFields(
            [{ name:'\u200b', value: progress.replace(/ 0:00/g, ' ◉ LIVE') },
            { name:'循環播放狀態', value: queue.repeatMode === QueueRepeatMode.TRACK ? '🔂 (單曲循環)' : queue.repeatMode === QueueRepeatMode.QUEUE ? '🔁 (清單循環)' : '▶ (沒有循環)' },
            { name:'觀看次數', value: `${view}` },
         ])
        .setAuthor({ name: queue.current.author, iconURL: queue.current.thumbnail })
        .setImage(queue.current.thumbnail)
        .toJSON();
	await interaction.editReply({ embeds:[embed] });
	},
};