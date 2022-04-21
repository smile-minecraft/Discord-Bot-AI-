const { MessageEmbed } = require('discord.js');
module.exports = {
	name: 'guildMemberRemove',
	once: false,
	execute(client,member) {
        console.log("偵測到有人離開伺服器:v"+member.user.username);
    try{
        const embed  = new MessageEmbed()
            .setColor('#FF0000')
            .setTitle(`${member.user.username}離開了合作社.w.`)
            .setDescription('祝他心想事成')
            .setThumbnail(member.user.displayAvatarURL())
            .setTimestamp()
            client.guilds.cache.get("867315843519610890").channels.cache.get("879630102642692096").send({embeds:[embed]});
    }catch(e){
        console.error(e);
    }
	},
};