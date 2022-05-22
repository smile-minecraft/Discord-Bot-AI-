const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const { default: axios } = require('axios');
module.exports = {
	data: new SlashCommandBuilder()
		.setName('twd')
		.setDescription('新台幣即時匯率'),
	async execute(client,interaction) {
    await axios.get("https://tw.rter.info/capi.php")
            .then(res => {
                var usd = Math.round(res.data["USDTWD"]["Exrate"]* 100) / 100
                var jp = Math.round(usd/res.data["USDJPY"]["Exrate"]* 100) / 100
                var kor = Math.round(usd/res.data["USDKRW"]["Exrate"]* 100) / 100
                var sing = Math.round(usd/res.data["USDSGD"]["Exrate"]* 100) / 100
                var malay = Math.round(usd/res.data["USDMYR"]["Exrate"]* 100) / 100
                var china = Math.round(usd/res.data["USDCNY"]["Exrate"]* 100) / 100
                var text = `美金:${usd}:1\n日幣:${jp}:1\n韓元:${kor}:1\n新加坡幣:${sing}:1\n馬幣:${malay}:1\n人民幣:${china}:1`

                const embed = new MessageEmbed()
                .setColor('#00FFFF')
                .setTitle('即時匯率轉換')
                .setDescription("可以查詢台幣匯率.w.")
                .addFields(
                    { name: '匯率', value: text }
                )
                .setThumbnail('https://i.imgur.com/DMYXQfr.png')
                .setTimestamp()
	        interaction.reply({embeds:[embed]});
            });
	},
};