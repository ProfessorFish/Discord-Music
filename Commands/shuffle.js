const Discord = require("discord.js");
module.exports = {
    triggers: ["shuffle"],
    usage: "shuffle",
    permissions: [],
    description: "Shuffle the song.",
    run: async function (message, client) {
        const args = message.content.split(" ")
        var userVC = message.member.voice.channel
        if (!userVC || typeof userVC === Discord.StageChannel) {
            return message.channel.send("Not in a voice channel!")
        }
        if (message.guild.me.voice.channel && message.member.voice.channel != message.guild.me.voice.channel) {
            return message.channel.send("You are not in the channel I am currently playing in: <#" + message.guild.me.voice.channel.id + ">")
        }
        var thisPlayer = client.players.find(k => k.id === message.guild.id)
        if (!thisPlayer.data.queue.songs[1]) return message.channel.send("No songs to shuffle!")
        await thisPlayer.shuffle();
    }
}