
module.exports = {
	name: 'GuildMemberAdd',
	once: false,
	async execute(member) {
        const { MessageEmbed } = require('discord.js');
        const channel = await client.channels.fetch("879559382906581052");
        const embed  = new MessageEmbed()
            .setColor('#7CFC00')
            .setTitle(`${member.displayname}來到了合作社.w.`)
            .setDescription('歡迎加入，請記得詳讀規則和其他說明')
            .addFields(
                { name: '🔸伺服器IP', value: "mbc.fnwl.tk:25600" },
                { name: '\u200B', value: '\u200B' }
            )
            .setThumbnail(member.avatar)
            .setTimestamp()
        channel.send({embeds:[embed]});
        member.roles.add('879556011818639412')
	},
};