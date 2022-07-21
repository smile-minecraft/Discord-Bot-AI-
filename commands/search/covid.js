const { SlashCommandBuilder, EmbedBuilder } = require('@discordjs/builders');
const { default: axios } = require('axios');
const { MessageEmbed } = require('discord.js');
const { color } = require('../../json/util.json');
module.exports = {
	data: new SlashCommandBuilder()
		.setName('covid')
		.setDescription('台灣疫情資料'),
	async execute(client,interaction) {
        axios.get("https://covid-19.nchc.org.tw/api/covid19?CK=covid-19@nchc.org.tw&querydata=4001&limited=TWN")
            .then(res => { // 這一段是機器人接收回復
                const number = res.data[0]["a05"];
                const date = res.data[0]["a04"];
                const add = res.data[0]["a06"];
                const death = res.data[0]["a09"];
                const vac = res.data[0]["a22"];
                const text = `確診總人數: ${number} \n 新增人數: ${add} \n 新增死亡人數: ${death} \n 新增疫苗接種數: ${vac} \n 日期: ${date}`;
                const embed = new EmbedBuilder()
                .setColor(color.red)
                .setTitle('台灣疫情資料.w.')
                .setDescription("防疫加油.w.")
                .addFields(
                    { name: '總確診人數', value:  text },
                )
                .setThumbnail('https://i.imgur.com/XtHWvQZ.png')
                .setTimestamp();
                interaction.reply({ embeds:[embed] });
            });
	},
};