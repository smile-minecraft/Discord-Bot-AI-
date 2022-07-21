/* const { MessageEmbed } = require('discord.js');
const { color } = require('../json/util.json');
const { SlashCommandBuilder } = require('@discordjs/builders');
module.exports = {
    data: new SlashCommandBuilder()
        .setName('music')
        .setDescription('音樂的所有相關指令')
        .addSubcommand(option =>
            option.setName('play')
                .setDescription('撥放音樂')
                .addStringOption(option =>
                    option.setName('query')
                        .setDescription('你想聽的音樂')
                        .setRequired(true)))
        .addSubcommand(option =>
            option.setName('volume')
                .setDescription('設定音量')
                .addIntegerOption(option =>
                    option.setName('percent')
                        .setDescription('設定音量百分比')
                        .setRequired(true)))
        .addSubcommand(option =>
            option.setName('settings')
                .setDescription('音樂設定')
                .addStringOption(option =>
                    option.setName('choices')
                        .setDescription('選擇音樂設定')
                        .setRequired(true)
                        .setChoices()
                        .setChoices('停止播放', 'stop')
                        .setChoices('暫停播放', 'pause')
                        .setChoices('繼續播放', 'resume')
                        .setChoices('跳過歌曲', 'skip'))),
*/
    /**
    * @param {CommandInteraction} Interaction
    * @param {Client} client
    *
    */
/*
    async execute(client, interaction) {
        const { options, member, guild, channel } = interaction;
        const VoiceChannel = member.voice.channel;

        if (!VoiceChannel) {
            const embed = new MessageEmbed()
                .setColor(color.red)
                .setTitle('你不在語音頻道裡')
                .setThumbnail('https://i.imgur.com/azwL1JE.png')
                .setTimestamp();
            await interaction.reply({ embeds: [embed], ephemeral: true });
            return;
        }
        if (guild.me.voice.channelId && VoiceChannel.id !== guild.me.voice.channelId) {
            const embed = new MessageEmbed()
                .setColor(color.red)
                .setTitle('你不在我的語音頻道裡')
                .setThumbnail('https://i.imgur.com/azwL1JE.png')
                .setTimestamp();
            await interaction.reply({ embeds: [embed], ephemeral: true });
        }
        try {
            switch (options.getSubcommand()) {
                case 'play':
                    client.distube.play(VoiceChannel, options.getString('query'), { textChannel: channel, member: member });
                    await interaction.reply({ content: "收到!", ephemeral: true });
                    break;
                case 'volume':
                    let Volume = options.getInteger('percent');
                    if (Volume > 100) {
                        Volume = 100;
                    }
                    else if (Volume < 0) {
                        Volume = 0;
                    }
                    client.distube.setVolume(VoiceChannel, Volume);
                    const embed1 = new MessageEmbed()
                        .setColor(color.lightblue)
                        .setTitle('**已調整音量**')
                        .setTimestamp();
                    await interaction.reply({ embeds: [embed1], ephemeral: false });
                    break;
                case 'settings':
                    const queue = await client.distube.getQueue(VoiceChannel);
                    if (!queue) {
                        const embed2 = new MessageEmbed()
                            .setColor(color.red)
                            .setTitle('**沒有正在播放的音樂**')
                            .setThumbnail('https://i.imgur.com/azwL1JE.png')
                            .setTimestamp();
                        await interaction.reply({ embeds: [embed2], ephemeral: false });
                        return;

                    }
                    console.log(options.getString('choices'));
                    switch (options.getString('choices')) {
                        case 'skip':
                            await queue.skip(VoiceChannel);
                            const embed3 = new MessageEmbed()
                                .setColor(color.lightblue)
                                .setTitle('**已跳過歌曲**')
                                .setTimestamp();
                            await interaction.reply({ embeds: [embed3], ephemeral: false });
                            break;
                        case 'stop':
                            await queue.stop(VoiceChannel);
                            const embed4 = new MessageEmbed()
                                .setColor(color.lightblue)
                                .setTitle('**已停止播放**')
                                .setTimestamp();
                            await interaction.reply({ embeds: [embed4], ephemeral: false });
                            break;
                        case 'pause':
                            await queue.pause(VoiceChannel);
                            const embed5 = new MessageEmbed()
                                .setColor(color.lightblue)
                                .setTitle('**已暫停播放**')
                                .setTimestamp();
                            await interaction.reply({ embeds: [embed5], ephemeral: false });
                            break;
                        case 'resume':
                            await queue.resume(VoiceChannel);
                            const embed6 = new MessageEmbed()
                                .setColor(color.lightblue)
                                .setTitle('**已繼續播放**')
                                .setTimestamp();
                            await interaction.reply({ embeds: [embed6], ephemeral: false });
                            break;
                        case 'queue':
                            const embed7 = new MessageEmbed()
                                .setColor(color.lightblue)
                                .setTitle('**播放清單**')
                                .setDescription(`🎶  ${queue.songs.map(
                                    (song, id) => `**${id + 1}**. ${song.name} - \`${song.formattedDuration}\``)}`,
                                )
                                .setThumbnail('https://i.imgur.com/iTVH3mM.png')
                                .setTimestamp();
                            await interaction.reply({ embeds: [embed7], ephemeral: false });
                            break;
                    }
            }

        }
        catch (e) {
            console.log(e);
        }

    },
};

*/