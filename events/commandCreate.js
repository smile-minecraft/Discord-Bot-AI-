module.exports = {
	name: 'interactionCreate',
	once: false,
	/**
	 * @param {import('discord.js').Interaction} interaction
	 * @param {import('discord.js').Client} client
	 */
	async execute(client,interaction) {
		if (interaction.isChatInputCommand()) {

	const command = client.commands.get(interaction.commandName);
	if (!command) return;

	try {
		if (command.useDefer) {
			await interaction.deferReply();
		}
		await command.execute(client,interaction);
	}
	catch (error) {
		console.error(error);
		if (command.useDefer) {
			await interaction.editReply({ content: '❌ | 發生錯誤' });
		}
		else {
			await interaction.reply({ content: '❌ | 發生錯誤' });
		}
	}
}
	},
};