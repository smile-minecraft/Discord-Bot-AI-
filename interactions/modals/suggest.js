const Suggest = require('../../database/models/suggest.js');
const { color } = require('../../json/util.json');
require('dotenv').config();
const { guildID } = process.env;
const { SuggestChannel } = require('../../json/config.json');
const { EmbedBuilder } = require('discord.js');


module.exports = {
	data: {
        name: 'suggest',
    },
    /**
     *  @param {import('discord.js').Client} client
     * @param {import('discord.js').ModalSubmitInteraction} interaction
     * @param {import('discord.js').Message} message
     */
	async execute(client,interaction) {
        const title = interaction.fields.getTextInputValue('titleInput');
	const description = interaction.fields.getTextInputValue('descriptionInput');
        const id = interaction.member.id;
        interaction.deferReply();

        const suggest = await Suggest.create({
                user_id: id,
                suggest_title: title,
                suggest_description: description,
        });
        await suggest.save();

        const embed = new EmbedBuilder()
        .setColor(color.yellow)
        .setTitle(`建議 #${suggest.get('suggest_id')}`)
        .addFields([
            { name: '標題', value: title },
            { name: '內容', value: description },
            { name: '建議人', value: `<@${interaction.user.id}>` },
        ])
        .setThumbnail('https://i.imgur.com/6ABkZah.png')
        .setTimestamp()
        .toJSON();

	    const message = await interaction.client.guilds.cache.get(guildID).channels.cache.get(SuggestChannel).send({ embeds:[embed] });
        await message.react('🟢');
        await message.react('🔴');
        const thread = await interaction.client.guilds.cache.get(guildID).channels.cache.get(SuggestChannel).threads.create({
            name: `建議 - ${suggest.get('suggest_id')}`,
            autoArchiveDuration: 60,
            reason: `${title}`,
        });
        console.log(`創建討論串: ${thread.name}`);
        await thread.members.add(id);

        await interaction.editReply({ content: '已送出建議🟢', ephemeral: true });
	},
};