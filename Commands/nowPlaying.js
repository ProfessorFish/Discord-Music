const Discord = require("discord.js")
const pretty = require("pretty-ms")
module.exports = {
  triggers: ["nowplaying", "np"],
  usage: "nowplaying",
  permissions: [],
  description: "Get information on the currently playing song.",
  run: async function(message, client){
    var thisPlayer = client.players.find(k=> k.id === message.guild.id)
    if(!thisPlayer)return message.channel.send("No music playing!")
    var thisSong = thisPlayer.data.queue.songs[0];
    const embed = new Discord.MessageEmbed()
    .setColor(client.config.embed_colour)
    .setThumbnail(thisSong.info.bestThumbnail.url)
    .setAuthor({name: "Song ended", url: thisSong.url, iconURL: thisSong.info.author.bestAvatar.url})
    .setTitle("Now playing the following:")
  .addField("Name:", `[${thisSong.info.title}](${thisSong.url})`, true)
  .addField("Progress:", `${pretty(Date.now() - (thisPlayer.data.queue.songs[0].startTime + thisPlayer.data.queue.songs[0].pauseTime), {colonNotation: true})}/${thisPlayer.data.queue.songs[0].info.duration}`, true)
    message.channel.send({embeds: [embed]})
  }
}