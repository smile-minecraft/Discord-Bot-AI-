const User = require('../database/models/user.js');
module.exports = {
	data: {
        name: 'profileEdit',
    },
	async execute(client,interaction) {
        const nickname = interaction.fields.getTextInputValue('nicknameInput');
	const description = interaction.fields.getTextInputValue('descriptionInput');
        const id = interaction.user.id;

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
        await interaction.reply({ content: '個人資訊已更新', ephemeral: true });
	},
};