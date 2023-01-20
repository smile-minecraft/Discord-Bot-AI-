const { SlashCommandBuilder } = require('@discordjs/builders');
module.exports = {
    useDefer: true,
	data: new SlashCommandBuilder()
		.setName('play')
		.setDescription('撥放音樂!')
        .addStringOption(option =>
            option.setName('搜尋')
                .setDescription('你想要聽的內容')
                .setRequired(true)),

    /**
	 * @param {import('discord.js').Interaction} interaction
	 * @param {import('discord.js').Client} client
	 */

	async execute(client,interaction) {
        if (!interaction.member.voice.channelId) {
            await interaction.editReply({ content: "你不在語音頻道裡!", ephemeral: true });
        }
        if (interaction.guild.members.me.voice.channelId && interaction.member.voice.channelId !== interaction.guild.members.me.voice.channelId) {
            await interaction.editReply({ content: "你不在我的語音頻道!", ephemeral: true });
        }
        const query = interaction.options.get("搜尋").value;
        try {
            await client.player.play(interaction.member.voice.channel, query, {
                member: interaction.member,
                textChannel: interaction.channel,
                interaction,
              });
              await interaction.editReply({ content: `🟢 **| 歌曲已加入歌單中!**` });
        }
        catch (error) {
            console.error(error);
            await interaction.editReply({ content: "❌ | 發生錯誤", ephemeral: true });
        }

	},
};