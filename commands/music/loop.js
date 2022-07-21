const { SlashCommandBuilder, EmbedBuilder } = require('@discordjs/builders');
const { QueueRepeatMode } = require('discord-player');
const { color } = require('../../json/util.json');
module.exports = {
	data: new SlashCommandBuilder()
		.setName('loop')
		.setDescription('重複播放歌曲')
        .addIntegerOption(option => (
            option.setName('mode')
            .setDescription('重複播放模式')
            .setRequired(false)
            .addChoices(
                { name: '單曲', value: QueueRepeatMode.TRACK },
                { name: '列表', value: QueueRepeatMode.QUEUE },
                { name: '自動播放', value: QueueRepeatMode.AUTOPLAY },
                { name: '關閉', value: QueueRepeatMode.OFF },
            )
        )),
	async execute(client,interaction) {
        const queue = client.player.getQueue(interaction.guild.id);

        if (!queue) {
            interaction.reply({ content: '❌ | 沒有正在播放的音樂' });
            return;
        }
        const loopMode = interaction.options.getInteger('mode');

        const success = queue.setRepeatMode(loopMode);

        const mode = loopMode === QueueRepeatMode.TRACK ? '🔂' : loopMode === QueueRepeatMode.QUEUE ? '🔁' : '▶';
        const embed = new EmbedBuilder()
        .setColor(color.lightgreen)
        .setTitle(success ? `${mode} | 更新循環狀態!` : '❌ | 無法更新狀態!')
        .setTimestamp()
        .toJSON();
        await interaction.reply({ embeds:[embed] });
	},
};