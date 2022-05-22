const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const { help } = require("../json/config.json")
module.exports = {
	data: new SlashCommandBuilder()
		.setName('suggest')
		.setDescription('提供伺服器建議')
        .addStringOption(option =>
            option.setName('種類')
                .setDescription('建議是關於哪一方面的')
                .setRequired(true)
                .addChoice('伺服器', '有關Minecraft 伺服器的建議')
			    .addChoice('群組', '有關Discord 群組的建議')
			    .addChoice('其他', '其他的建議'))
        .addStringOption(option =>
            option.setName('標題')
                .setDescription('建議的標題')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('內容')
                .setDescription('建議的內容')
                .setRequired(true)),
	async execute(interaction) {
        const type = interaction.options.getString('種類');
        const suggest = interaction.options.getString('標題');
        const content = interaction.options.getString('內容');
        const embed = new MessageEmbed()
        .setColor('#FFD306')
        .setTitle(`${interaction.member.nickname}提出了${type}`)
        .addField('標題', `${suggest}`, true)
        .addField('內容', `${content}`, true)
        .setDescription(`真是很棒的建議呢`)
        .setThumbnail('https://i.imgur.com/6ABkZah.png')
        .setTimestamp()                
	    const message = await interaction.client.guilds.cache.get("867315843519610890").channels.cache.get("911841280940703785").send({embeds:[embed]});
        await message.react('🟢');
        await message.react('🔴');
        interaction.reply('已經發送到伺服器建議頻道了');
	},
};