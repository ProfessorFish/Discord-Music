module.exports = async function(thise){
    const Discord = require("discord.js")
    const embed = new Discord.MessageEmbed()
      .setColor(thise.client.config.embed_colour)
      .setThumbnail(thise.data.queue.songs[0].info.bestThumbnail.url)
      .setAuthor({name: "Song skipped.", url: thise.data.queue.songs[0].url, iconURL: thise.data.queue.songs[0].info.author.bestAvatar.url})
      .setTitle("Skipped song.")
    .addField("Name:", `[${thise.data.queue.songs[0].info.title}](${thise.data.queue.songs[0].url})`, true)
    thise.data.textChannel.send({embeds: [embed]})
    await thise.data.audioPlayer.stop(true);
  }