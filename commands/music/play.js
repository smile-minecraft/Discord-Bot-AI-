const { SlashCommandBuilder } = require('@discordjs/builders');
const { QueryType } = require('discord-player');
module.exports = {
	data: new SlashCommandBuilder()
		.setName('play')
		.setDescription('撥放音樂!')
        .addStringOption(option =>
            option.setName('搜尋')
                .setDescription('你想要聽的內容')
                .setRequired(true)),
	async execute(client,interaction) {
        if (!interaction.member.voice.channelId) {
            await interaction.reply({ content: "你不在語音頻道裡!", ephemeral: true });
        }
        if (interaction.guild.members.me.voice.channelId && interaction.member.voice.channelId !== interaction.guild.members.me.voice.channelId) {
            await interaction.reply({ content: "你不在我的語音頻道!", ephemeral: true });
        }
        const query = interaction.options.get("搜尋").value;
        const queue = client.player.createQueue(interaction.guild, {
            metadata: {
                channel: interaction.channel,
            },
        });
        try {
            if (!queue.connection) await queue.connect(interaction.member.voice.channel);
        }
        catch {
            queue.destroy();
            return await interaction.followUp({ content: "我無法加入你的語音頻道!", ephemeral: true });
        }

        await interaction.deferReply();


        const searchResult = await client.player
        .search(query, {
            requestedBy: interaction.user,
            searchEngine: QueryType.AUTO,
        });

        if (!searchResult) return await interaction.followUp({ content: `❌ | 找不到 **${query}** 的搜尋結果!` });

        searchResult.playlist ? queue.addTracks(searchResult.tracks) : queue.addTrack(searchResult.tracks[0]);

        await interaction.followUp({ content: `🟢 | ${searchResult.playlist ? '播放清單' : '歌曲'} **${searchResult.playlist ? searchResult.tracks[0] + "(合輯)" : searchResult.tracks[0] }** 已加入歌單中!` });

        if (!queue.playing) {
        console.log("撥放音樂");
        queue.play();
        }

	},
};