const { color } = require('../../json/util.json');
require('dotenv').config();
const { guildID } = process.env;
const { EmbedBuilder } = require('discord.js');


module.exports = {
	data: {
        name: 'list',
    },
    /**
     *  @param {import('discord.js').Client} client
     * @param {import('discord.js').ModalSubmitInteraction} interaction
     */
	async execute(client,interaction) {
        const queue = client.player.getQueue(interaction.guild.id);

        if (!queue || !queue.playing) {
            return interaction.reply({ content: '❌ | 沒有正在播放的音樂' });
        }
        const pageStart = 10 * (1 - 1);
        const pageEnd = pageStart + 10;
        const songs = queue.songs.slice(pageStart, pageEnd).map((m, i) => {
            return `${i + pageStart + 1}. **${m.name}** ([link](${m.streamURL}))`;
        });
        const embed = new EmbedBuilder()
            .setColor(color.lightgreen)
            .setTitle('🎵 | 播放清單')
            .setDescription(`${songs === '' ? '待播清單沒有東西' : songs.join('\n')}${
                queue.songs.length > pageEnd
                    ? `\n...還有${queue.songs.length - pageEnd} 首歌曲`
                    : '\n沒有更多歌曲了'
            }`)
            .setTimestamp()
            .toJSON();
        await interaction.reply({ embeds:[embed] });
	},
};