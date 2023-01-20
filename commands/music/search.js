const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder } = require('@discordjs/builders');
const { ApplicationCommandOptionType, ButtonStyle } = require('discord.js');
const { color } = require('../../json/util.json');
const logger = require('../../utils/console/logger.js');

module.exports = {
        useDefer: true,
	data: new SlashCommandBuilder()
		.setName('search')
		.setDescription('搜尋音樂')
        .addStringOption(option =>
            option.setName('query')
                .setDescription('輸入音樂名稱')
                .setRequired(true)),
        /**
         *
         * @param {import('discord.js').Client} client
         * @param {import('discord.js').CommandInteraction} interaction
         */
	async execute(client,interaction) {
        const query = interaction.options.getString('query');
        if (!query) return interaction.editReply({ content: '🟡 請輸入有效的歌曲名稱', ephemeral: true }).catch(e => { });

        try {
            res = await client.player.search(query, {
              member: interaction.member,
              textChannel: interaction.channel,
              interaction,
            });

            const maxSongs = res.slice(0, 10);

        const track_button_creator = maxSongs.map((song, index) => {
        return new ButtonBuilder()
          .setLabel(`${index + 1}`)
          .setStyle(ButtonStyle.Secondary)
          .setCustomId(`${index + 1}`);
      });

      let buttons1;
      let buttons2;

      if (track_button_creator.length > 10) {
        buttons1 = new ActionRowBuilder().addComponents(track_button_creator.slice(0, 5));
        buttons2 = new ActionRowBuilder().addComponents(track_button_creator.slice(5, 10));
      }
        else if (track_button_creator.length > 5) {
          buttons1 = new ActionRowBuilder().addComponents(track_button_creator.slice(0, 5));
          buttons2 = new ActionRowBuilder().addComponents(track_button_creator.slice(5, Number(track_button_creator.length)));
        }
        else {
          buttons1 = new ActionRowBuilder().addComponents(track_button_creator);
        }
        const cancel = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
              .setLabel('取消')
              .setStyle(ButtonStyle.Danger)
              .setCustomId('cancel'));

              const text = "從 **1** 到 **{maxSongs.length}** 選擇一首歌曲 ⬇️";
        const embed = new EmbedBuilder()
            .setColor(color.lightgreen)
            .setTitle('🎵 | 搜尋結果')
            .setDescription(`${maxSongs.map((song, i) => `**${i + 1}**. [${song.name}](${song.url}) | \`${song.uploader.name}\``).join('\n')}\n\n${text.replace("{maxSongs.length}", maxSongs.length)}`)
            .setTimestamp();
            let code;
            if (buttons1 && buttons2) {
              code = { embeds: [embed], components: [buttons1, buttons2, cancel], ephemeral: true };
            }
            else {
              code = { embeds: [embed], components: [buttons1, cancel], ephemeral: true };
            }
            interaction.editReply(code).then(async Message => {
                const filter = i => i.user.id === interaction.user.id;
                const collector = await interaction.channel.createMessageComponentCollector({ filter, time: 60000 });

                collector.on('collect', async (button) => {
                    switch (button.customId) {
                      case 'cancel': {
                        embed.setDescription(`搜尋取消 ✅`);
                        await interaction.editReply({ embeds: [embed], components: [] }).catch(e => { });
                        return collector.stop();
                      }
                        break;
                      default: {

                        embed.setThumbnail(maxSongs[Number(button.customId) - 1].thumbnail);
                        embed.setDescription(`**${res[Number(button.customId) - 1].name}** 已加入歌單`);
                        await interaction.editReply({ embeds: [embed], components: [] }).catch(e => { });
                        try {
                          await client.player.play(interaction.member.voice.channel, res[Number(button.customId) - 1].url, {
                            member: interaction.member,
                            textChannel: interaction.channel,
                            interaction,
                          });
                        }
                    catch (e) {
                          await interaction.editReply({ content: '沒有找到搜尋結果 🔴', ephemeral: true }).catch(e => { });
                        }
                        return collector.stop();
                      }
                    }
                  });

                  collector.on('end', (msg, reason) => {

                    if (reason === 'time') {
                      embed.setDescription('歌曲搜索時間已過期 ❌');
                      return interaction.editReply({ embeds: [embed], components: [] }).catch(e => { });
                    }
                  });

                }).catch(e => { });

          }
            catch (e) {
            logger.error(e);
            return interaction.editReply({ content: '🔴 找不到結果' });
          }
        },
};