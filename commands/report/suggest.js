const { SlashCommandBuilder, EmbedBuilder , ActionRowBuilder, ModalBuilder, TextInputBuilder } = require('@discordjs/builders');
const { TextInputStyle } = require('discord.js');
const { color } = require('../../json/util.json');
require('dotenv').config();
const { guildID } = process.env;
const { SuggestChannel } = require('../../json/config.json');

module.exports = {
    useDefer: false,
	data: new SlashCommandBuilder()
		.setName('suggest')
		.setDescription('提供伺服器建議'),
	async execute(client,interaction) {
        const modal = new ModalBuilder()
			    .setCustomId('suggest')
			    .setTitle('提供伺服器建議');

            const titleInput = new TextInputBuilder()
			    .setCustomId('titleInput')
			    .setLabel("建議的標題")
			    .setStyle(TextInputStyle.Short)
                .setPlaceholder("請輸入建議的標題")
                .setRequired(true)
                .setMaxLength(20);


		    const descriptionInput = new TextInputBuilder()
			    .setCustomId('descriptionInput')
			    .setLabel("建議的內容")
			    .setStyle(TextInputStyle.Paragraph)
                .setPlaceholder("請輸入建議的內容")
                .setRequired(true)
                .setMaxLength(1000);

		    const firstActionRow = new ActionRowBuilder().addComponents(titleInput);
		    const secondActionRow = new ActionRowBuilder().addComponents(descriptionInput);

		    modal.addComponents(firstActionRow, secondActionRow);
            await interaction.showModal(modal);

    },
};