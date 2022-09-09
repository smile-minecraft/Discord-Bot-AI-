const { SlashCommandBuilder, EmbedBuilder } = require('@discordjs/builders');
const { color } = require('../../json/util.json');
require('dotenv').config();
const { guildID } = process.env;
const { SuggestChannel } = require('../../json/config.json');

module.exports = {
    useDefer: true,
	data: new SlashCommandBuilder()
		.setName('suggest')
		.setDescription('提供伺服器建議')
        .addStringOption(option =>
            option.setName('種類')
                .setDescription('建議是關於哪一方面的')
                .setRequired(true)
                .addChoices(
                    { name: '伺服器', value: 'Minecraft伺服器' },
                    { name: '群組', value: '群組' },
                    { name: '其他', value: '其他' },
                    ))
        .addStringOption(option =>
            option.setName('標題')
                .setDescription('建議的標題')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('內容')
                .setDescription('建議的內容')
                .setRequired(true)),
	async execute(client,interaction) {
        const type = interaction.options.getString('種類');
        const suggest = interaction.options.getString('標題');
        const content = interaction.options.getString('內容');
        const embed = new EmbedBuilder()
        .setColor(color.yellow)
        .setTitle(`${suggest}`)
        .addFields([
            { name: '內容', value: content },
            { name: '建議人', value: `<@${interaction.member.id}>` },
            { name: '類別', value: type },
        ])
        .setThumbnail('https://i.imgur.com/6ABkZah.png')
        .setTimestamp();
	    const message = await interaction.client.guilds.cache.get(guildID).channels.cache.get(SuggestChannel).send({ embeds:[embed] });
        await message.react('🟢');
        await message.react('🔴');
        interaction.editReply('已經發送到伺服器建議頻道了');
        setTimeout(() => {
            interaction.deleteReply();
	},10000);
    },
};