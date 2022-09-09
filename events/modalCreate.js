const { InteractionType } = require('discord.js');
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
		console.error(error);
		await interaction.member.send({ content: '執行組件發生錯誤❌', ephemeral: true });
	}

	},
};