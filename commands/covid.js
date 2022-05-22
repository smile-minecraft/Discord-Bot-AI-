const { SlashCommandBuilder } = require('@discordjs/builders');
const { default: axios } = require('axios');
const { MessageEmbed } = require('discord.js');
module.exports = {
	data: new SlashCommandBuilder()
		.setName('covid')
		.setDescription('台灣疫情資料'),
	async execute(client,interaction) {
        
        axios.get("https://covid-19.nchc.org.tw/api/covid19?CK=covid-19@nchc.org.tw&querydata=4001&limited=TWN")
            .then(res => {//這一段是機器人接收回復
                
                let number = res.data[0]["a05"];
                let date = res.data[0]["a04"];
                let add = res.data[0]["a06"];
                let death = res.data[0]["a09"];
                let vac = res.data[0]["a22"];
                let text = `確診總人數: ${number} \n 新增人數: ${add} \n 新增死亡人數: ${death} \n 新增疫苗接種數: ${vac} \n 日期: ${date}`;
                const embed = new MessageEmbed()
                .setColor('#ff0000')
                .setTitle('台灣疫情資料.w.')
                .setDescription("防疫加油.w.")
                .addFields(
                    { name: '總確診人數', value:  text },
                )
                .setThumbnail('https://i.imgur.com/XtHWvQZ.png')
                .setTimestamp()
	        interaction.reply({embeds:[embed]});
            })
	},
};