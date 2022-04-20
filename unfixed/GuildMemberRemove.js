module.exports = {
	name: 'GuildMemberRemove',
	once: false,
	async execute(member) {
        const { MessageEmbed } = require('discord.js');
        const channel = await client.channels.fetch("879630102642692096");
        const embed  = new MessageEmbed()
            .setColor('#FF0000')
            .setTitle(`${member.displayname}離開了合作社.w.`)
            .setDescription('祝他心想事成')
            .setThumbnail(member.avatar)
            .setTimestamp()
        channel.send({embeds:[embed]});
	},
};