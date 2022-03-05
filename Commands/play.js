const Discord = require("discord.js");
const pretty = require("pretty-ms");
const { toMilliseconds } = require("colon-notation");
module.exports = {
  triggers: ["play", "p"],
  usage: "play <song URL or name>",
  permissions: [],
  description: "Play a song in your voice channel",
  run: async function(message, client) {
    const args = message.content.split(" ")
    args.splice(0, 1);
    const args0 = args.join(" ")
    var userVC = message.member.voice.channel
    if (!userVC || typeof userVC === Discord.StageChannel) {
      return message.channel.send("Please join a valid voice channel!")
    }
    if (message.guild.me.voice.channel && message.member.voice.channel != message.guild.me.voice.channel) {
      return message.channel.send("I'm already playing in the following channel: <#" + message.guild.me.voice.channel.id + ">")
    }
    if (!args[0] && client.players.find(k => k.id === message.guild.id)) {
      var thisPlayer = client.players.find(k => k.id === message.guild.id)
      thisPlayer.resume();
      return;
    } else if (!args[0] && !client.players.find(k => k.id === message.guild.id)) {
      return message.channel.send("Please provide a search term!")
    }
    let videoData = await client.classes.Searcher.search(args0, client)
    if (!videoData) return message.channel.send("No results found!")
    var vidStuff = []
    if (videoData[0]) {
      for (var i = 0; i < videoData.length; i++) {
        vidStuff.push(videoData[i])
      }
    } else {
      vidStuff.push(videoData)
    }
    var player;
    if (!client.players.find(k => k.id === message.guild.id)) {
      player = new client.classes.Player(client, message.member.voice.channel, message.channel)
      await player.start();
    } else player = client.players.find(k => k.id === message.guild.id);
    var totalLength = 0;
    for (var i = 0; i < vidStuff.length; i++) {
      totalLength += toMilliseconds(vidStuff[i].duration)
    }
    if (videoData[0]) {
      const embed = new Discord.MessageEmbed()
        .setColor(client.config.embed_colour)
        .setThumbnail(videoData[0].bestThumbnail.url)
        .setAuthor({ name: "First up: " + videoData[0].title, url: videoData[0].url })
        .setTitle("Added " + videoData.length + " song(s) to the queue!")
        .setFooter({ text: "Duration: " + pretty(totalLength, { colonNotation: true }) })
      message.channel.send({ embeds: [embed] })
    } else {
      const embed = new Discord.MessageEmbed()
        .setColor(client.config.embed_colour)
        .setThumbnail(videoData.bestThumbnail.url)
        .setAuthor({ name: videoData.title, url: videoData.url, iconURL: videoData.author.bestAvatar.url })
        .setTitle("Added the following song to the queue!")
        .setFooter({ text: "Duration: " + pretty(totalLength, { colonNotation: true }) })
      message.channel.send({ embeds: [embed] })
    }
    for (var i = 0; i < vidStuff.length; i++) {
      await player.addSong(vidStuff[i]);
    }
  }
}