const { logChannel } = require('../../json/config.json');
require('dotenv').config();
const { guildID } = process.env;
const { EmbedBuilder } = require('discord.js');

module.exports = {
    send(client,title, content, color) {
        const embed = new EmbedBuilder()
        .setColor(color)
        .setTitle(title)
        .setDescription(`${content}`)
        .setTimestamp();
    client.guilds.cache.get(guildID).channels.cache.get(logChannel).send(
        { embeds:[embed] });
    },
    send(client,embed) {
        client.guilds.cache.get(guildID).channels.cache.get(logChannel).send(
            { embeds:[embed] });
    },
};