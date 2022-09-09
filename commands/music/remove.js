const { SlashCommandBuilder, EmbedBuilder } = require('@discordjs/builders');
const { color } = require('../../json/util.json');
module.exports = {
    useDefer: true,
	data: new SlashCommandBuilder()
		.setName('remove')
		.setDescription('跳過歌曲')
        .addIntegerOption(option => option
            .setName('編號')
            .setDescription('要移除的歌曲編號')
            .setRequired(true)
            .setMinValue(1)),

	async execute(client,interaction) {
        const queue = client.player.getQueue(interaction.guild.id);
        if (!queue) {
            interaction.editReply({ content: '❌ | 沒有正在播放的音樂' });
        }
        else {
            const trackIndex = interaction.options.getInteger('編號') - 1;
            if (trackIndex < 0 || trackIndex > queue.tracks.length - 1) {
                interaction.editReply({ content: '❌ | 歌曲編號不正確' });
            }
            else {
            const track = queue.tracks[trackIndex];
            const trackName = queue.tracks[trackIndex].title;
            queue.remove(trackIndex);

            const embed = new EmbedBuilder()
            .setColor(color.lightgreen)
            .setTitle(`🟢 | 已移除歌曲${trackName}`)
            .setTimestamp()
            .toJSON();

            await interaction.editReply({ embeds:[embed] });
            console.log(`移除: ${trackName}`);
            }

        }


	},
};