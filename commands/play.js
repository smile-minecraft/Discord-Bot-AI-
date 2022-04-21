const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const { Player } = require("discord-player");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('play')
		.setDescription('音樂功能，使用此指令來撥放音樂.w.')
        .addStringOption(option =>
            option.setName('query')
                .setDescription('你想聽的音樂.w.')
                .setRequired(true)),
        
	async execute(client,interaction) {
        const player = new Player(client);                
        if (!interaction.member.voice.channelId) return await interaction.reply({ content: "你不在語音頻道裡!.w.", ephemeral: true });
        if (interaction.guild.me.voice.channelId && interaction.member.voice.channelId !== interaction.guild.me.voice.channelId) return await interaction.reply({ content: "你不在我的語音頻道裡", ephemeral: true });
        const query = interaction.options.get("query").value;
        const queue = player.createQueue(interaction.guild, {
            metadata: {
                channel: interaction.channel
            }
        });
        
        // verify vc connection
        try {
            if (!queue.connection) await queue.connect(interaction.member.voice.channel);
        } catch {
            queue.destroy();
            return await interaction.reply({ content: "無法加入你的語音頻道!", ephemeral: true });
        }

        await interaction.deferReply();
        const track = await player.search(query, {
            requestedBy: interaction.user
        }).then(x => x.tracks[0]);
        if (!track) return await interaction.followUp({ content: `❌ | 找不到 **${query}** ` });

        queue.play(track);

        return await interaction.followUp({ content: `⏱️ | 正在載入 **${track.title}**!` });
	},
};