const Discord = require("discord.js");
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
    if(!args[0] && client.players.find(k=> k.id === message.guild.id)){
      var thisPlayer = client.players.find(k=> k.id === message.guild.id)
      thisPlayer.resume();
      return;
    } else if(!args[0] && !client.players.find(k=> k.id === message.guild.id)){
      return message.channel.send("Please provide a search term!")
    }
    let videoData = await client.classes.Searcher.search(args0)
    if (!videoData) return message.channel.send("No results found!")
    var player;
    if (!client.players.find(k => k.id === message.guild.id)) {
      player = new client.classes.Player(client, message.member.voice.channel, message.channel)
      await player.start();
    } else player = client.players.find(k => k.id === message.guild.id);
    await player.addSong(videoData.url, videoData);
    const embed = new Discord.MessageEmbed()
      .setColor(client.config.embed_colour)
      .setThumbnail(videoData.bestThumbnail.url)
      .setAuthor({ name: videoData.title, url: videoData.url, iconURL: videoData.author.bestAvatar.url })
      .setTitle("Added the following song to the queue!")
    message.channel.send({ embeds: [embed] })
    //console.log(player.data.queue.songs)
  }
}