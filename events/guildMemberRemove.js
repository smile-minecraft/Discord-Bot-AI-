module.exports = {
	name: 'guildMemberRemove',
	once: false,
	execute(client,message) {
        console.log("偵測到有人離開伺服器:v"+member.user.username);
    try{
    const channel = client.channels.fetch("879630102642692096");
        const embed  = new MessageEmbed()
            .setColor('#FF0000')
            .setTitle(`${member.user.username}離開了合作社.w.`)
            .setDescription('祝他心想事成')
            .setThumbnail(member.user.displayAvatarURL())
            .setTimestamp()
        channel.send({embeds:[embed]});
    }catch(e){
        console.error(e);
    }
	},
};