const User = require('../database/models/user.js');
module.exports = {
	data: {
        name: 'profileEdit',
    },
	async execute(client,interaction) {
        const nickname = interaction.fields.getTextInputValue('nicknameInput');
	const description = interaction.fields.getTextInputValue('descriptionInput');
        const id = interaction.member.id;

        const [user, created] = await User.findOrCreate({
                where: { user_id: id },
                defaults: {
                  user_nickname: nickname,
                  description: description,
                  user_id: id,
                },
              });
                  if (!created) {
                        user.user_nickname = nickname;
                        user.description = description;
                        await user.save();
                          }
        await User.update({ description: description, user_nickname: nickname }, { where: { user_id: id } });
        await interaction.reply({ content: '個人資訊已更新', ephemeral: true });
	},
};