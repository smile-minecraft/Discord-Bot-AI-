const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, User } = require('discord.js');
const fs = require('fs')
module.exports = {
	data: new SlashCommandBuilder()
		.setName('profile')
		.setDescription('你專屬的自我介紹頁面')
		.addUserOption(option =>
			option.setName('用戶')
			.setDescription('你想要查看的對象')
			.setRequired(true))
		,
	async execute(client,interaction) {
		if(interaction.isCommand){
			console.log("這是一條指令");
		}
		let newUser = {
			"info": "",
			"nickname": "",
			"Advancements": "",
			"donate": 0,
			"type":"",
		}
		const user = interaction.options.getUser('用戶');
		
		if (user) {//如果用戶是別人
			const userJSON = require('../json/user.json');
			const id = user.id;
			const userProfile = userJSON[id];
			if (userProfile === null){
		try {
			const embed = new MessageEmbed()
            .setColor('#ff0000')
            .setTitle('找不到他的自我介紹')
            .setDescription('也許他太害羞了.w.')
            .setThumbnail('https://i.imgur.com/ozMGIhy.gif')
            .setTimestamp()
                
        
        await interaction.reply({embeds:[embed]})
		}catch(error){
			console.error();
		}

			}
			else{
				const embed = new MessageEmbed()
            .setColor('#ffd700')
            .setTitle(`用戶${user.username}的自我介紹`)
            .setDescription(`**資訊**:${userProfile.info}\n**暱稱**:${userProfile.nickname}\n
			**斗內金額**:${userProfile.donate}\n**暱稱**:${userProfile.nickname}\n****:${userProfile.nickname}\n`)
            .setThumbnail('https://i.imgur.com/ozMGIhy.gif')
            .setTimestamp()
                
        
        await interaction.reply({embeds:[embed]});
			}
			
		} else {// 如果用戶是本人
			const userJSON = require('../json/user.json');
			const id = user.id;
			const userProfile = userJSON[id];
			if (userProfile === null){
		try {
			const embed = new MessageEmbed()
            .setColor('#ff0000')
            .setTitle('找不到你的自我介紹')
            .setDescription('也許你太害羞了.w.')
            .setThumbnail('https://i.imgur.com/ozMGIhy.gif')
            .setTimestamp()
                
        
        await interaction.reply({embeds:[embed]})
		}catch(error){
			console.error();
		}

			}
			else{
				const embed = new MessageEmbed()
            .setColor('#ffd700')
            .setTitle(`用戶${user.username}的自我介紹`)
            .setDescription(`**資訊**:${userProfile.info}\n**暱稱**:${userProfile.nickname}\n
			**斗內金額**:${userProfile.donate}\n**暱稱**:${userProfile.nickname}\n****:${userProfile.nickname}\n`)
            .setThumbnail('https://i.imgur.com/ozMGIhy.gif')
            .setTimestamp()
                
        
        await interaction.reply({embeds:[embed]});
		}
	}},
};