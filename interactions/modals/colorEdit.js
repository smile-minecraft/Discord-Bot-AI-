const User = require('../../database/models/user.js');
module.exports = {
	data: {
        name: 'colorEdit',
    },
    /**
     * @param {import('discord.js').Client} client
     * @param {import('discord.js').CommandInteraction} interaction
     */
	async execute(client,interaction) {
        const color = interaction.fields.getTextInputValue('colorInput');

        var hexx = color.replace('#', '0x');
        var r = hexx >> 16;
        var g = hexx >> 8 & 0xff;
        var b = hexx & 0xff;


        const id = interaction.user.id;

        const [user, created] = await User.findOrCreate({
                where: { user_id: id },
                defaults: {
                    description: '這個人什麼都沒有寫',
                  user_id: id,
                },
              });
                  if (!created) {
                        await user.save();
                          }
        await User.update({ color_R: r, color_G: g, color_B: b }, { where: { user_id: id } });
        await interaction.reply({ content: '個人資訊已更新', ephemeral: true });

	},
};