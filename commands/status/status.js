const { SlashCommandBuilder, EmbedBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const { connection } = require('mongoose');
const { time } = require('@discordjs/builders');
const { color } = require('../../json/util.json');

module.exports = {
    useDefer: true,
	data: new SlashCommandBuilder()
		.setName('status')
		.setDescription('顯示資料庫、機器人的連接狀態'),
	async execute(client,interaction) {
        const times = time(client.readyTimestamp / 1000 >> 0);
        const embed = new EmbedBuilder()
        .setColor(color.yellow)
        .setTitle('機器人連線狀態')
        .addField('延遲',`${ Date.now() - interaction.createdTimestamp } ms`)
        .addField('資料庫連線狀態',`${ switchTo (connection.readyState) }`)
        .addField('開啟時間',`${times}`)
        .setThumbnail('https://i.imgur.com/9nIkdgC.png')
        .setTimestamp();
	await interaction.reply({ embeds:[embed] });
	},
};
function switchTo(Val) {
    let status = '';
    switch (Val) {
        case 0:
            status = '🔴--已關閉';
            break;
        case 1:
            status = '🟢--已連接';
            break;
        case 2:
            status = '🟡連線中...';
            break;
        case 3:
            status = '🟣斷線中...';
            break;
        default:
            status = '🔴--錯誤';
        }
        return status;
}