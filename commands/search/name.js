const { SlashCommandBuilder, EmbedBuilder } = require('@discordjs/builders');
const { default: axios } = require('axios');
const { MessageEmbed } = require('discord.js');
const { color } = require('../../json/util.json');
module.exports = {
    useDefer: true,
	data: new SlashCommandBuilder()
		.setName('name')
		.setDescription('產生隨機名字'),
	async execute(client,interaction) {
        axios.get("https://api.parser.name/?api_key=d5580862f719273f9ded571df5bc8a0a&endpoint=generate&country_code=US")
            .then(res => { // 這一段是機器人接收回復
                console.log(res["data"]["data"][0]["name"]["firstname"]["name"]);
                const name = res["data"]["data"][0]["name"]["firstname"]["name"] + " " + res["data"]["data"][0]["name"]["lastname"]["name"];
                const embed1 = new EmbedBuilder()
                .setColor(res["data"]["data"][0]["name"]["firstname"]["gender"] == "m" ? color.lightblue : color.pink)
                .setTitle('隨機名字')
                .addFields(
                    { name: '性別', value: `${res["data"]["data"][0]["name"]["firstname"]["gender"] == "m" ? "男生" : "女生"}` },
                    { name: '名字', value: `${name}`, inline: true },
                )
                .setTimestamp();

                interaction.editReply({ embeds:[embed1] });
            });
	},
};