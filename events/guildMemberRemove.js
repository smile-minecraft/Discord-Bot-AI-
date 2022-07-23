const { EmbedBuilder } = require('@discordjs/builders');
const { guildId,GoodByeChannel } = require('../json/config.json');
module.exports = {
	name: 'guildMemberRemove',
	once: false,
	execute(client,member) {
        console.log("偵測到有人離開伺服器:v" + member.user.username);
    try {
        const embed = new EmbedBuilder()
            .setColor('#FF0000')
            .setTitle(`${member.user.username}離開了合作社.w.`)
            .setDescription('祝他心想事成')
            .setThumbnail(member.user.displayAvatarURL())
            .setTimestamp();
            client.guilds.cache.get(guildId).channels.cache.get(GoodByeChannel).send({ embeds:[embed] });
    }
    catch (e) {
        console.error(e);
    }
	},
};