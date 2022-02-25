const { Client, Intents, SelectMenuInteraction,Collection } = require('discord.js');
const { MessageActionRow, MessageSelectMenu } = require('discord.js');
const { MessageEmbed } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });//這裡定義監聽器的基本功能
const { token, guildId } = require('./json/config.json');
const { help } = require('./json/config.json');
const fs = require('fs');
client.commands = new Collection();
//#region 讀取commands指令
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.data.name, command);
}
//#endregion

//#region 自定義函數
const ver = require("./json/config.json")//版本號
//#endregion

//#region 啟動指令
client.once('ready', () => {
    require('./deploy-commands');
    console.log(` ${client.user.tag}已登入!`);
  });
client.login(token);
//#endregion

//#region 文字偵測
client.on('messageCreate', message => {
    if (!message.guildId === guildId) message.reply({
        embeds: [
            new MessageEmbed()
                .setColor('#CE0000')
                .setTitle('無法使用')
                .setDescription('機器人不允許DM訊息使用指令')
                .setThumbnail('https://i.imgur.com/jU1VGC2.png')]});
    const con = message.content;
    const url = message.url;
    const axios = require('axios')

let APIhost = "http://150.117.110.118:10150/"
let APIkey = require("./json/config.json")
let FormatVersion = 1
let Data =
    "APIkey=" + APIkey +
    "&&Function=et" +
    "&&Type=urlChecker" +
    "&&FormatVersion=" + FormatVersion +
    `&&Value=${url}`

axios
        .post(APIhost, Data)
        .then(res => {
            if (res.data["state"] === "Success") {
                console.log(res.data)
                if (res.data["response"] === "All URL inspections passed") {
                    message.react("✅")
                }
                else if (res.data["response"] === "No URL found") {
                    console.log("")
                }
                else {
                    const embed1 = new MessageEmbed()
                        .setColor('#45F7CB')
                        .setTitle('偵測到風險性網址')
                        .setDescription(con)
                        .setThumbnail('https://i.imgur.com/azwL1JE.png')
                        .setTimestamp()
                    message.delete()
                }
            } else {
                console.log(`錯誤: ${res.data["response"]}`)
            }
        }).catch(err => {
            APIhost = "http://220.134.162.44:10150/"
        })

    });
//#endregion

//#region 斜線指令
    client.on('interactionCreate', async interaction => {
        if (!interaction.inGuild()) return interaction.reply({
            embeds: [
                new MessageEmbed()
                    .setColor('#CE0000')
                    .setTitle('無法使用')
                    .setDescription('機器人不允許DM訊息使用指令')
                    .setThumbnail('https://i.imgur.com/jU1VGC2.png')

            ],
        });
            const command = client.commands.get(interaction.commandName);

            if (!command) return;

            try {
                await command.execute(interaction);
            } catch (error) {
                console.error(error);
                await interaction.channel.send({ content: '執行指令時發現錯誤:/', ephemeral: true });
            }

    });
//#endregion
