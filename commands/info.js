const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
module.exports = {
	data: new SlashCommandBuilder()
		.setName('info')
		.setDescription('群組的相關資訊'),
	async execute(interaction) {
		var botcount = interaction.guild.members.cache.filter(m => m.user.bot).size;
        var membercount = interaction.guild.memberCount;
        var mancount =  membercount - botcount;
        const embed = new MessageEmbed()
            .setColor('#45F7CB')
            .setTitle('伺服器相關資訊')
            .setDescription('伺服器名稱:'+ interaction.guild.name + "\n伺服器實際人數:"+ mancount)
            .setThumbnail(interaction.guild.icon)
            .setTimestamp()
                
        
        await interaction.reply({embeds:[embed]})
    
	},
};