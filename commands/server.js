const { SlashCommandBuilder } = require('@discordjs/builders');
const { default: axios } = require('axios');
const { MessageEmbed } = require('discord.js');
module.exports = {
	data: new SlashCommandBuilder()
		.setName('server')
		.setDescription('伺服器狀態'),
	async execute(client,interaction) {
        axios.get("https://api.mcsrvstat.us/2/mbc.fnwl.tk")
            .then(res => {//這一段是機器人接收回復
                var players = res.data["players"]["online"];
                var maxplayers = res.data["players"]["max"];
                var ip = res.data["ip"];
                var ver = res.data["version"]
                var port = res.data["port"]
                var protocol = res.data["protacol"]
                var online = res.data["online"]
                const embed1 = new MessageEmbed()
                .setColor('#45F7CB')
                .setTitle('合作社-伺服器狀態')
                .setDescription('伺服器有狀況記得回報管理員喔~')
                .addFields(
                    { name: '伺服器在線人數', value: `${players}/${maxplayers}` },
                    { name: '\u200B', value: '\u200B' },
                    { name: '伺服器連線位址', value: `網址:mbc.fnwl.tk\n基岩版連接埠:${port}`, inline: true },
                    { name: '\u200B', value: '\u200B' },
                    { name: '版本號', value: `${ver}`, inline: true }
                )
                .setThumbnail("https://i.imgur.com/0Hti98o.png")
                .setTimestamp()

                const embed2 = new MessageEmbed()
                .setColor('#45F7CB')
                .setTitle('合作社-伺服器狀態-離線')
                .setDescription('伺服器有狀況記得回到管理員喔~')
                .setThumbnail("https://i.imgur.com/azwL1JE.png")
                .setTimestamp()
            if(online){
                interaction.reply({embeds:[embed1]})
            }
            else{
                interaction.reply({embeds:[embed2]})
            }
            })
	},
};