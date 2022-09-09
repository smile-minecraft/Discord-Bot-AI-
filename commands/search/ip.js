const { SlashCommandBuilder, EmbedBuilder } = require('@discordjs/builders');
const { default: axios } = require('axios');
const { MessageEmbed } = require('discord.js');
const { countryCode , isp , color } = require('../../json/util.json');
module.exports = {
    useDefer: true,
	data: new SlashCommandBuilder()
		.setName('ip')
		.setDescription('針對IP位置進行調查')
        .addStringOption(option =>
            option.setName('ip')
                .setDescription('要查水表的IP位置')
                .setRequired(true)),
	async execute(client,interaction) {
        const IP = interaction.options.getString('ip');
        axios.get(`http://ip-api.com/json/${IP}?fields=22282239`)
            .then(res => { // 這一段是機器人接收回復
                var status = res.data["status"];
                var ip = res.data["query"];
                var city = res.data["city"];
                var ISP = res.data["isp"];
                var proxy = res.data["proxy"];
                var mobile = res.data["mobile"];
                var counCode = res.data["countryCode"];
                if (countryCode[counCode] !== undefined) {
                    counCode = countryCode[counCode];
                }
                if (isp[ISP] !== undefined) {
                    ISP = isp[ISP];
                }


                const embed1 = new EmbedBuilder()
                .setColor(color.purple)
                .setTitle('IP查詢')
                .setDescription('阿姨到你家去查水表了喔~')
                .addFields(
                    { name: 'IP位置', value: `${ip}` },
                    { name: '國家', value: `${counCode}` },
                    { name: '預估城市', value: `${city}` },
                    { name: '電信商', value: `${ISP}` },
                    { name: '是不是VPN', value: `${proxy ? "是" : "否"}` },
                    { name: '移動裝置', value: `${mobile ? "是" : "否"}` },
                )
                .setThumbnail("https://i.imgur.com/0Hti98o.png")
                .setTimestamp();

                const embed2 = new EmbedBuilder()
                .setColor(color.purple)
                .setTitle('找不到要查水表的對象')
                .setDescription('阿姨找不到這個IP位置喔~')
                .setThumbnail("https://i.imgur.com/azwL1JE.png")
                .setTimestamp();

                if (status) {
                    interaction.editReply({ embeds:[embed1] });
                }
                else {
                    interaction.editReply({ embeds:[embed2] });
                }
            });
	},
};