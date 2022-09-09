const { SlashCommandBuilder, EmbedBuilder } = require('@discordjs/builders');
const { color } = require('../../json/util.json');
const { name } = require('../../music/events/trackStart');
module.exports = {
    useDefer: true,
	data: new SlashCommandBuilder()
		.setName('volume')
		.setDescription('設定音量')
        .addIntegerOption(option => option
            .setName('volume')
            .setDescription('若不填則顯示目前音量')
            .setRequired(false)
            .setMaxValue(100)
            .setMinValue(0))
        ,
	async execute(client,interaction) {
        const queue = client.player.getQueue(interaction.guild.id);
        if (!queue) {
            interaction.editReply({ content: '❌ | 沒有正在播放的音樂' });
        }
        const vol = parseInt(interaction.options.getInteger('volume'));

        if (!vol) {
            interaction.editReply({ content: `🎧 | 當前音量是 **${queue.volume}**%` });
        }
        else if (vol < 0 || vol > 100) {
            interaction.sendFollowUp({ content: '❌ | 音量範圍必須介於0-100之間' });
        }
        else {
        const success = queue.setVolume(vol);
        return void interaction.editReply({
            content: success ? `✅ | 設定音量為 **${vol}%**!` : '❌ | 發生錯誤',
        });
    }
	},
};