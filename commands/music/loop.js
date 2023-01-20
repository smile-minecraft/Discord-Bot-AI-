const { SlashCommandBuilder, EmbedBuilder } = require('@discordjs/builders');
const { color } = require('../../json/util.json');
module.exports = {
    useDefer: true,
	data: new SlashCommandBuilder()
		.setName('loop')
		.setDescription('重複播放歌曲')
        .addIntegerOption(option => (
            option.setName('mode')
            .setDescription('重複播放模式')
            .setRequired(true)
            .addChoices(
                { name: '單曲循環', value: 1 },
                { name: '列表循環', value: 2 },
                { name: '關閉', value: 0 },
            )
        )),
	async execute(client,interaction) {
        const queue = client.player.getQueue(interaction.guild.id);

        if (!queue || !queue.playing) {
            interaction.editReply({ content: '❌ | 沒有正在播放的音樂' });
            return;
        }
        const loopMode = interaction.options.getInteger('mode');

        const success = queue.setRepeatMode(loopMode);

        const mode = loopMode === 1 ? '🔂' : loopMode === 2 ? '🔁' : '▶';
        const embed = new EmbedBuilder()
        .setColor(color.lightgreen)
        .setTitle(success ? `${mode} | 更新循環狀態!` : '❌ | 無法更新狀態!')
        .setTimestamp()
        .toJSON();
        await interaction.editReply({ embeds:[embed] });
	},
};