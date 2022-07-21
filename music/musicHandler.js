const musicHandler = (client) => {
    const { Player } = require("discord-player");

    const player = new Player(client);

    player.on("trackStart", (queue, track) =>
    queue.metadata.channel.send(`🎶 | 現在播放 **${track.title}**!`));


};
module.exports = musicHandler;