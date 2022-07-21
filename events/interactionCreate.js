module.exports = {
	name: 'interactionCreate',
	once: false,
	async execute(client,interaction) {
		if (interaction.isChatInputCommand()) {

	const command = client.commands.get(interaction.commandName);
	if (!command) return;

	try {
		await command.execute(client,interaction);
	}
	catch (error) {
		console.error(error);
		await interaction.reply({ content: '執行指令發生錯誤:/', ephemeral: true });
	}
}
	},
};