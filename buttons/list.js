const { color } = require('../json/util.json');
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

        if (!queue) {
            interaction.reply({ content: '❌ | 沒有正在播放的音樂' });
        }
        const page = 1;
        const pageStart = 10 * (page - 1);
        const pageEnd = pageStart + 10;
        const tracks = queue.tracks.slice(pageStart, pageEnd).map((m, i) => {
            return `${i + pageStart + 1}. **${m.title}** ([link](${m.url}))`;
        });
        const embed = new EmbedBuilder()
            .setColor(color.lightgreen)
            .setTitle('🎵 | 播放清單')
            .setDescription(`${tracks === '' ? '待播清單沒有東西' : tracks.join('\n')}${
                queue.tracks.length > pageEnd
                    ? `\n...還有${queue.tracks.length - pageEnd} 首歌曲`
                    : '\n沒有更多歌曲了'
            }`)
            .setTimestamp()
            .toJSON();
        await interaction.reply({ embeds:[embed] });
	},
};