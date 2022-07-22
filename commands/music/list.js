const { SlashCommandBuilder, EmbedBuilder } = require('@discordjs/builders');
const { color } = require('../../json/util.json');
const { QueueRepeatMode } = require('discord-player');
module.exports = {
	data: new SlashCommandBuilder()
		.setName('list')
		.setDescription('查看播放清單')
        .addIntegerOption(option =>
            option.setName('page')
            .setDescription('指定要查看的頁數')
            .setRequired(false)
            .setMaxValue(100)
            .setMinValue(0)),

	async execute(client,interaction) {
        const queue = client.player.getQueue(interaction.guild.id);

        if (!queue) {
            interaction.reply({ content: '❌ | 沒有正在播放的音樂' });
        }
        let page;
        if (!interaction.options.getInteger('page')) {
            page = 1;
        }
        else {
            page = interaction.options.getInteger('page');
        }
        const pageStart = 10 * (page - 1);
        const pageEnd = pageStart + 10;
        const currentTrack = queue.current;
        const tracks = queue.tracks.slice(pageStart, pageEnd).map((m, i) => {
            return `${i + pageStart + 1}. **${m.title}** ([link](${m.url}))`;
        });
        const embed = new EmbedBuilder()
            .setColor(color.lightgreen)
            .setTitle('🎵 | 播放清單')
            .setDescription(`${tracks === null ? '待播清單沒有東西' : tracks.join('\n')}${
                queue.tracks.length > pageEnd
                    ? `\n...還有${queue.tracks.length - pageEnd} 首歌曲`
                    : ''
            }`)
            .setTimestamp()
            .toJSON();
        await interaction.reply({ embeds:[embed] });
	},
};