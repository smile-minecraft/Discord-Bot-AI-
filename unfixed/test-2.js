const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const fs = require('fs');
const { color } = require('../json/util.json');
module.exports = {
	data: new SlashCommandBuilder()
		.setName('test')
		.setDescription('測試')
        .addUserOption(option =>
            option.setName('input')
                .setDescription('The input to echo back')
                .setRequired(true)),
	async execute(client,interaction) {
        const USER = JSON.parse(fs.readFile('user.json'),function(err, data) {
            if (err) throw err;
          });
        console.log(USER);
        const user = interaction.options.getUser('input');
        const id = user.id;
		const userProfile = users[id];
			if (userProfile == null) {
			const embed = new MessageEmbed()
            .setColor('#ff0000')
            .setTitle('找不到他的自我介紹')
            .setDescription('也許他太害羞了.w.')
            .setThumbnail('https://i.imgur.com/ozMGIhy.gif')
            .setTimestamp();
        await interaction.reply({ embeds:[embed] });

			}
			else {
				const embed = new MessageEmbed()
            .setColor('#ffd700')
            .setTitle(`用戶${user.username}的自我介紹`)
            .setDescription(`**資訊**:${userProfile.info}\n**暱稱**:${userProfile.nickname}\n
			**斗內金額**:${userProfile.donate}\n**暱稱**:${userProfile.nickname}\n**性別/生物類型**:${userProfile.type}\n`)
            .setThumbnail('https://i.imgur.com/ozMGIhy.gif')
            .setTimestamp();
        await interaction.reply({ embeds:[embed] });
	}
    },
};