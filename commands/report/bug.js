const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ModalBuilder, TextInputBuilder } = require('@discordjs/builders');
const { TextInputStyle } = require('discord.js');
const { color } = require('../../json/util.json');
require('dotenv').config();
const { guildID } = process.env;
const { ReportChannel } = require('../../json/config.json');

module.exports = {
    useDefer: false,
	data: new SlashCommandBuilder()
		.setName('bug')
		.setDescription('回報遊戲BUG/漏洞'),

	async execute(client,interaction) {
        const modal = new ModalBuilder()
			    .setCustomId('bug')
			    .setTitle('回報遊戲BUG/漏洞');

            const titleInput = new TextInputBuilder()
			    .setCustomId('titleInput')
			    .setLabel("回報漏洞的標題")
			    .setStyle(TextInputStyle.Short)
                .setPlaceholder("請輸入回報漏洞的標題")
                .setRequired(true)
                .setMaxLength(20);


		    const descriptionInput = new TextInputBuilder()
			    .setCustomId('descriptionInput')
			    .setLabel("回報漏洞的內容")
			    .setStyle(TextInputStyle.Paragraph)
                .setPlaceholder("請輸入回報漏洞的內容")
                .setRequired(true)
                .setMaxLength(1000);

		    const firstActionRow = new ActionRowBuilder().addComponents(titleInput);
		    const secondActionRow = new ActionRowBuilder().addComponents(descriptionInput);

		    modal.addComponents(firstActionRow, secondActionRow);
            await interaction.showModal(modal);
    },
};