const { Client, Intents, SelectMenuInteraction,Collection } = require('discord.js');
const { MessageActionRow, MessageSelectMenu } = require('discord.js');
const { MessageEmbed } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES,Intents.FLAGS.GUILD_MEMBERS] });//這裡定義監聽器的基本功能
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

//#region 單獨讀取事件文件
const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const event = require(`./events/${file}`);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}
//#endregion

//#region 動態執行指令
client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	const command = client.commands.get(interaction.commandName);

	if (!command) return;

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: '執行指令發生錯誤:/', ephemeral: true });
	}
});
//#endregion

client.on('guildMemberAdd',async member =>{
    console.log("偵測到有人加入伺服器:v"+member.user.username);
    try{
    const channel = await client.channels.fetch("879559382906581052");
        const embed  = new MessageEmbed()
            .setColor('#7CFC00')
            .setTitle(`${member.user.username}來到了合作社.w.`)
            .setDescription('歡迎加入，請記得詳讀規則和其他說明')
            .addFields(
                { name: '\u200B', value: '\u200B' },
                { name: '🔸伺服器IP', value: "mbc.fnwl.tk:25600" }
            )
            .setThumbnail(member.user.displayAvatarURL())
            .setTimestamp()
        channel.send({embeds:[embed]});
        member.roles.add('879556011818639412');
            }catch(e){
                console.error(e);
            }
})
client.on('guildMemberRemove', member =>{
    console.log("偵測到有人離開伺服器:v"+member.user.username);
    try{
    const channel = client.channels.fetch("879630102642692096");
        const embed  = new MessageEmbed()
            .setColor('#FF0000')
            .setTitle(`${member.user.username}離開了合作社.w.`)
            .setDescription('祝他心想事成')
            .setThumbnail(member.user.displayAvatarURL())
            .setTimestamp()
        channel.send({embeds:[embed]});
    }catch(e){
        console.error(e);
    }
})
client.login(token);