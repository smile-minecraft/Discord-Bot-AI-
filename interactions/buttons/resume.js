const { color } = require('../../json/util.json');
require('dotenv').config();
const { guildID } = process.env;
const { EmbedBuilder } = require('discord.js');


module.exports = {
	data: {
        name: 'resume',
    },
    /**
     *  @param {import('discord.js').Client} client
     * @param {import('discord.js').ModalSubmitInteraction} interaction
     */
	async execute(client,interaction) {
        const queue = client.player.getQueue(interaction.guild.id);
        client.player.getQueue(interaction.guild.id).resume();
        if (!queue || !queue.playing) {
                return interaction.reply({ content: '❌ | 沒有正在播放的音樂' });
            }
        const embed = new EmbedBuilder()
        .setColor(color.lightgreen)
        .setTitle('🟢 | 已繼續播放歌曲')
        .setDescription(`${client.player.getQueue(interaction.guild.id).songs[0].name}`)
        .setTimestamp()
        .toJSON();
        await interaction.reply({ embeds:[embed] });


	},
};