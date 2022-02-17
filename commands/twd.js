const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const { default: axios } = require('axios');
module.exports = {
	data: new SlashCommandBuilder()
		.setName('twd')
		.setDescription('新台幣即時匯率'),
	async execute(interaction) {
    await axios.get("https://tw.rter.info/capi.php")
            .then(res => {
                console.log(res.data)
                var usd = res.data["USDTWD"]["Exrate"]
                var jp = usd/res.data["USDJPY"]["Exrate"]
                var kor = usd/res.data["USDKRW"]["Exrate"]
                var sing = usd/res.data["USDSGD"]["Exrate"]
                var malay = usd/res.data["USDMYR"]["Exrate"]
                var china = usd/res.data["USDCNY"]["Exrate"]
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