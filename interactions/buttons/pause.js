const { color } = require('../../json/util.json');
require('dotenv').config();
const { guildID } = process.env;
const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');


module.exports = {
	data: {
        name: 'pause',
    },
    /**
     *  @param {import('discord.js').Client} client
     * @param {import('discord.js').ModalSubmitInteraction} interaction
     */
	async execute(client,interaction) {
        const queue = client.player.getQueue(interaction.guild.id);

        if (!queue || !queue.playing) {
                    interaction.editReply({ content: '❌ | 沒有正在播放的音樂' });
                    return;
                }
        queue.pause();

        const row = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setCustomId('resume')
					.setLabel('繼續播放')
					.setStyle(ButtonStyle.Primary),
			);

            const embed = new EmbedBuilder()
            .setColor(color.lightyellow)
            .setTitle('🟡 | 已暫停歌曲')
            .setDescription(`${client.player.getQueue(interaction.guild.id).songs[0].name}`)
            .setTimestamp()
            .toJSON();
	    await interaction.reply({ embeds:[embed], components:[row] });

	},
};