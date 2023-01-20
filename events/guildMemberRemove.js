const { EmbedBuilder } = require('@discordjs/builders');
const { GoodByeChannel } = require('../json/config.json');
require('dotenv').config();
const { guildID } = process.env;
const { color } = require('../json/util.json');
const discordConsole = require('../utils/console/discordConsole');
const logger = require('../utils/console/logger.js');

module.exports = {
	name: 'guildMemberRemove',
	once: false,
	execute(client,member) {
        logger.leave("偵測到有人離開伺服器 - " + member.user.username);
    try {
        const embed = new EmbedBuilder()
            .setColor(color.red)
            .setTitle(`${member.user.username}離開了合作社.w.`)
            .setDescription('祝他心想事成')
            .setThumbnail(member.user.displayAvatarURL())
            .setTimestamp();
            client.guilds.cache.get(guildID).channels.cache.get(GoodByeChannel).send({ embeds:[embed] });
            discordConsole.send(client,embed);
    }
    catch (e) {
        logger.error(e);
    }
	},
};