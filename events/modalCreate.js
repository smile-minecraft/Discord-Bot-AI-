const { InteractionType } = require('discord.js');
const discordConsole = require('../utils/console/discordConsole.js');
const logger = require('../utils/console/logger.js');
const { color } = require('../json/util.json');

module.exports = {
	name: 'interactionCreate',
	once: false,
    /**
     * @param {import('discord.js').Client} client
     * @param {import('discord.js').BaseInteraction} interaction
     */
	async execute(client,interaction) {
		if (!interaction.isModalSubmit()) return;

	const modal = client.modals.get(interaction.customId);
	if (!modal) return;

	try {
		await modal.execute(client,interaction);
	}
	catch (error) {
		logger.error(error);
		discordConsole.send(client,`執行模組發生錯誤❌`,error,color.red);
		await interaction.channel.send({ content: '執行組件發生錯誤❌', ephemeral: true });
	}

	},
};