const { SlashCommandBuilder, EmbedBuilder } = require('@discordjs/builders');
const { color } = require('../../json/util.json');
module.exports = {
    useDefer: true,
	data: new SlashCommandBuilder()
		.setName('skip')
		.setDescription('跳過歌曲'),
	async execute(client,interaction) {
        const queue = client.player.getQueue(interaction.guild.id);
        if (!queue) {
            interaction.editReply({ content: '❌ | 沒有正在播放的音樂' });
        }
        else {
            queue.skip();
            const embed = new EmbedBuilder()
            .setColor(color.lightgreen)
            .setTitle('🟢 | 已跳過歌曲')
            .setTimestamp()
            .toJSON();

            await interaction.editReply({ embeds:[embed] });
        }


	},
};