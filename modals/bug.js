const Bug = require('../database/models/bug.js');
const { color } = require('../json/util.json');
require('dotenv').config();
const { guildID } = process.env;
const { BugChannel } = require('../json/config.json');
const { EmbedBuilder } = require('discord.js');


module.exports = {
	data: {
        name: 'bug',
    },
    /**
     *  @param {import('discord.js').Client} client
     * @param {import('discord.js').ModalSubmitInteraction} interaction
     */
	async execute(client,interaction) {
        const title = interaction.fields.getTextInputValue('titleInput');
	const description = interaction.fields.getTextInputValue('descriptionInput');
        const id = interaction.user.id;
        interaction.deferReply();

        const bug = await Bug.create({
                user_id: id,
                bug_description: description,
        });
        await bug.save();

        const embed = new EmbedBuilder()
        .setColor(color.yellow)
        .setTitle(`問題回報 #${bug.get('bug_id')}`)
        .addFields([
            { name: '標題', value: title },
            { name: '內容', value: description },
            { name: '回報者', value: `<@${interaction.user.id}>` },
        ])
        .setThumbnail('https://i.imgur.com/zsRwKwe.png')
        .setTimestamp()
        .toJSON();

	    const message = await interaction.client.guilds.cache.get(guildID).channels.cache.get(BugChannel).send({ embeds:[embed] });
        const thread = await interaction.client.guilds.cache.get(guildID).channels.cache.get(BugChannel).threads.create({
            name: `問題回報 - ${bug.get('bug_id')}`,
            autoArchiveDuration: 60,
            reason: `${title}`,
        });
        console.log(`創建討論串: ${thread.name}`);
        await thread.members.add(id);

        await interaction.editReply({ content: '已送出問題回報🟢', ephemeral: true });
	},
};