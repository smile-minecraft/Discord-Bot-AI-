const { SlashCommandBuilder, EmbedBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const { color } = require('../../json/util.json');
const User = require('../../database/models/user.js');
module.exports = {
	useDefer: true,
	data: new SlashCommandBuilder()
		.setName('profile')
		.setDescription('用戶的個人介紹')
		.addUserOption(option =>
			option.setName('用戶')
			.setDescription('你想要查看的對象')
			.setRequired(true))
		,
		/**
		 * @param {import('discord.js').Client} client
		 * @param {import('discord.js').CommandInteraction} interaction
		 * @param {import('../../database/models/user')} user
		 * @param {import('discord.js').GuildMember} member
		 */

	async execute(client,interaction) {
		const target = interaction.options.getUser('用戶');
		const id = target.id;
		const targetname = target.username;
		const targetavatar = target.avatarURL();

		const [user, created] = await User.findOrCreate(
			{
				where: { user_id: id },
				defaults: {
					description: '這個人什麼都沒有寫',
					user_id: id,
					},
				});
		if (!created) {
			await user.save();
			  }

	const userProfile = new EmbedBuilder()
		.setColor(color.blue)
		.setTitle(` ${targetname} 的介紹`)
		.addFields([
			{ name: '暱稱', value: `${user.get('user_nickname') ? user.get('user_nickname') : targetname}`, inline: false },
			{ name: '介紹', value: `${user.get('description')}`, inline: false },
			{ name: '餘額', value: `$${user.get('balance')}` },
			{ name: '等級', value: `Lv. ${user.get('level')}` },
			{ name: 'ID', value: id },

		])
		.setColor([user.get('color_R'), user.get('color_G'), user.get('color_B')])
		.setThumbnail(targetavatar)
		.setTimestamp();
		await interaction.editReply({ embeds:[userProfile] });
	},
};