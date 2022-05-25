const { MessageEmbed } = require('discord.js');
const { WelcomeChannel,guildId } = require("../json/config.json");
module.exports = {
	name: 'guildMemberAdd',
	once: false,
	execute(client,member) {
        console.log("偵測到有人加入伺服器:v"+member.user.username);
    try{
    member.roles.add('879556011818639412');
    
        const embed  = new MessageEmbed()
            .setColor('#7CFC00')
            .setTitle(`${member.user.username}來到了合作社.w.`)
            .setDescription('歡迎加入，請記得詳讀規則和其他說明')
            .addFields(
                { name: '\u200B', value: '\u200B' },
                { name: '🔸伺服器IP', value: "mbc.fnwl.tk:25600" }
            )
            .setThumbnail(member.user.displayAvatarURL())
            .setTimestamp()
            client.guilds.cache.get(guildId).channels.cache.get(WelcomeChannel).send({embeds:[embed]});
        
            }catch(e){
                console.error(e);
            }
	},
};