const Report = require('../../database/models/report.js');
const { color } = require('../../json/util.json');
require('dotenv').config();
const { guildID } = process.env;
const { ReportChannel } = require('../../json/config.json');
const { EmbedBuilder } = require('discord.js');
const logger = require('../../utils/console/logger.js');


module.exports = {
	data: {
        name: 'report',
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

        const report = await Report.create({
                user_id: id,
                report_reason: description,
        });
        await report.save();

        const embed = new EmbedBuilder()
        .setColor(color.yellow)
        .setTitle(`舉報 #${report.get('report_id')}`)
        .addFields([
            { name: '標題', value: title },
            { name: '內容', value: description },
            { name: '舉報者', value: `<@${interaction.user.id}>` },
        ])
        .setThumbnail('https://i.imgur.com/90oJpmR.png')
        .setTimestamp()
        .toJSON();

	    const message = await interaction.client.guilds.cache.get(guildID).channels.cache.get(ReportChannel).send({ embeds:[embed] });
        const thread = await interaction.client.guilds.cache.get(guildID).channels.cache.get(ReportChannel).threads.create({
            name: `舉報 - ${report.get('report_id')}`,
            autoArchiveDuration: 60,
            reason: `${title}`,
        });
        logger.info(`創建討論串: ${thread.name}`);
        await thread.members.add(id);

        await interaction.editReply({ content: '已送出舉報🟢', ephemeral: true });
	},
};