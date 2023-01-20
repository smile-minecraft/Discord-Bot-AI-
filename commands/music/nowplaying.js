const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder } = require('@discordjs/builders');
const { ButtonStyle } = require('discord.js');
const { color } = require('../../json/util.json');
module.exports = {
    useDefer: true,
	data: new SlashCommandBuilder()
		.setName('nowplaying')
		.setDescription('查看目前正在播放的歌曲'),
	async execute(client,interaction) {
        const queue = client.player.getQueue(interaction.guild.id);

        if (!queue || !queue.playing) {
            interaction.editReply({ content: '❌ | 沒有正在播放的音樂' });
            return;
        }

        const song = queue.songs[0];
        const view = song.views;

        const row = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setCustomId('list')
					.setLabel('播放列表')
					.setStyle(ButtonStyle.Primary),
                new ButtonBuilder()
                    .setCustomId('pause')
                    .setLabel('暫停')
                    .setStyle(ButtonStyle.Success),
			);

        const embed = new EmbedBuilder()
        .setColor(color.lightnavy)
        .setTitle(song.name)
        .setTimestamp()
        .addFields(
            [{ name:'時間軸', value: `${formatSecond(queue.currentTime)} / ${song.formattedDuration}` },
            { name:'循環播放狀態', value: `${queue.repeatMode === 1 ? '🔂 (單曲循環)' : queue.repeatMode === 2 ? '🔁 (清單循環)' : '▶ (沒有循環)' }` },
            { name:'觀看次數', value: `${view}` },
         ])
        .setImage(song.thumbnail)
        .toJSON();
	await interaction.editReply({ embeds:[embed] , components: [row] });
	},
};

function formatSecond(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    const minutesString = minutes.toString().padStart(2, '0');
    const remainingSecondsString = remainingSeconds.toString().padStart(2, '0');

    return `${minutesString}:${remainingSecondsString}`;
}
