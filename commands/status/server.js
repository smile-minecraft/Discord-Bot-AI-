const { SlashCommandBuilder, EmbedBuilder } = require('@discordjs/builders');
const { default: axios } = require('axios');
const { MessageEmbed } = require('discord.js');
const { color } = require('../../json/util.json');
const logger = require('../../utils/console/logger');
module.exports = {
    useDefer: true,
	data: new SlashCommandBuilder()
		.setName('server')
		.setDescription('伺服器狀態'),
	async execute(client,interaction) {

        (async () => { // 異步函數
            let mbc = {};
            let heyNight = {};

            async function status() {
                const url = `https://api.mcsrvstat.us/2/mbc.fnwl.tk`;
                const response = await axios.get(url);
                mbc = response.data;
                const url2 = `https://api.mcsrvstat.us/2/heynight.tk`;
                const response2 = await axios.get(url2);
                heyNight = response2.data;
              }
            await status();

            const embed = new EmbedBuilder()
                .setColor(color.green)
                .setTitle('合作社-伺服器狀態')
                .setDescription(`主分流/副分流 ${mbc.online ? '🟢' : '🔴'}\n三分流 ${heyNight.online ? '🟢' : '🔴'}`)
                .addFields(
                    { name: '伺服器總人數', value: `${mbc.players.online + heyNight.players.online}/${mbc.players.max + heyNight.players.max}` },
                    { name: '伺服器IP位址', value: `mbc.fnwl.tk`, inline: true },
                    { name: '連接埠', value: `25600`, inline: true },
                )
                .setThumbnail("https://i.imgur.com/0Hti98o.png")
                .setTimestamp();
                try {
                    await interaction.editReply({ embeds:[embed] });
                }
                catch (error) {
                    logger.error(error);
                }
          })();
	},
};