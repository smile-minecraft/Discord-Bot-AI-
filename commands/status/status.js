const { SlashCommandBuilder, EmbedBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const { time } = require('@discordjs/builders');
const { color } = require('../../json/util.json');

module.exports = {
    useDefer: true,
	data: new SlashCommandBuilder()
		.setName('status')
		.setDescription('顯示資料庫、機器人的連接狀態'),
        /**
         * @param {import('discord.js').Client} client
         * @param {import('discord.js').CommandInteraction} interaction
         */
	async execute(client,interaction) {
        const times = time(client.readyTimestamp / 1000 >> 0);
        const embed = new EmbedBuilder()
        .setColor(color.yellow)
        .setTitle('機器人連線狀態')
        .addFields([
            { name: '延遲', value: `${ Date.now() - interaction.createdTimestamp } ms` },
            { name: '開啟時間', value: `${times}` },
        ])
        .setThumbnail('https://i.imgur.com/9nIkdgC.png')
        .setTimestamp();
	await interaction.editReply({ embeds:[embed] });
	},
};