const { SlashCommandBuilder, EmbedBuilder } = require('@discordjs/builders');
const { color } = require('../../json/util.json');
require('dotenv').config();
const { guildID } = process.env;
const { ReportChannel } = require('../../json/config.json');

module.exports = {
    useDefer: true,
	data: new SlashCommandBuilder()
		.setName('report')
		.setDescription('舉報玩家/糾紛案件')
        .addStringOption(option =>
            option.setName('標題')
                .setDescription('建議的標題')
                .setRequired(true))

        .addStringOption(option =>
            option.setName('內容')
                .setDescription('建議的內容')
                .setRequired(true)),

	async execute(client,interaction) {
        const report = interaction.options.getString('標題');
        const content = interaction.options.getString('內容');

        const embed = new EmbedBuilder()
        .setColor(color.yellow)
        .setTitle(`${interaction.member.displayName}開啟了問題回報`)
        .addFields([
            { name: '標題', value: report },
            { name: '內容', value: content },
        ])
        .setThumbnail('https://i.imgur.com/90oJpmR.png')
        .setTimestamp();
	    const message = await interaction.client.guilds.cache.get(guildID).channels.cache.get(ReportChannel).send({ embeds:[embed] });
        interaction.editReply('已經發送到伺服器的回報頻道🟢請前往查看!');

        const thread = await interaction.client.guilds.cache.get(guildID).channels.cache.get(ReportChannel).threads.create({
            name: `回報 - test`,
            autoArchiveDuration: 60,
            reason: '測試',
        });

        console.log(`討論串已創建: ${thread.name}`);
        setTimeout(() => {
            interaction.deleteReply();
	},10000);
    },
};