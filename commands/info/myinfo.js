const { SlashCommandBuilder, EmbedBuilder,ActionRowBuilder, ModalBuilder, TextInputBuilder } = require('@discordjs/builders');
const { TextInputStyle } = require('discord.js');
const { MessageEmbed } = require('discord.js');
const { color } = require('../../json/util.json');

module.exports = {
    useDefer: false,
	data: new SlashCommandBuilder()
		.setName('myinfo')
		.setDescription('編輯我的個人介紹')
        .addIntegerOption(option => option
            .setName('類別')
            .setDescription('要編輯的資料類別')
            .setRequired(true)
            .addChoices({ name: '自我介紹', value: 1 },
                        { name: '顏色', value: 2 },
                        ),

            ),

        /**
         * @param {import('discord.js').Client} client
         * @param {import('discord.js').CommandInteraction} interaction
         */
	async execute(client,interaction) {
        const category = interaction.options.get('類別').value;

try {
        if (category === 1) {

            const modal = new ModalBuilder()
			    .setCustomId('profileEdit')
			    .setTitle('編輯個人資訊');

            const nicknameInput = new TextInputBuilder()
			    .setCustomId('nicknameInput')
			    .setLabel("你的暱稱/綽號")
			    .setStyle(TextInputStyle.Short)
                .setPlaceholder("請輸入你的暱稱/綽號")
                .setRequired(false)
                .setMaxLength(20);


		    const descriptionInput = new TextInputBuilder()
			    .setCustomId('descriptionInput')
			    .setLabel("你的簡介")
			    .setStyle(TextInputStyle.Paragraph)
                .setPlaceholder("請輸入你的簡介")
                .setRequired(false)
                .setValue("沒有介紹")
                .setMaxLength(1000);

		    const firstActionRow = new ActionRowBuilder().addComponents(nicknameInput);
		    const secondActionRow = new ActionRowBuilder().addComponents(descriptionInput);

		    modal.addComponents(firstActionRow, secondActionRow);
            await interaction.showModal(modal);
        }
        else if (category === 2) {
            const modal = new ModalBuilder()
                .setCustomId('colorEdit')
                .setTitle('編輯個人封面顏色RGB');

            const colorInput = new TextInputBuilder()
                .setCustomId('colorInput')
                .setLabel("你的顏色RGB")
                .setStyle(TextInputStyle.Short)
                .setPlaceholder("#ffffff")
                .setRequired(true)
                .setMaxLength(7);


            const firstActionRow = new ActionRowBuilder().addComponents(colorInput);

            modal.addComponents(firstActionRow);
            await interaction.showModal(modal);
        }
    }
 catch (error) {
        console.log(error);
    }
    },
};