module.exports = async function(thise){
  const { createAudioResource } = require("@discordjs/voice");
  const Discord = require("discord.js");
  try{
    if(!thise.data.queue.songs[0].info){
      await thise.data.queue.songs[0].resolveData();
    }
  await thise.data.audioPlayer.play(createAudioResource(thise.data.queue.songs[0].stream.stream));
  } catch(err){
    console.log(err)
  }
  thise.data.queue.songs[0].startTime = Date.now();
  const embed = new Discord.MessageEmbed()
    .setColor(thise.client.config.embed_colour)
    .setThumbnail(thise.data.queue.songs[0].info.bestThumbnail.url)
    .setAuthor({name: "Song ended", url: thise.data.queue.songs[0].url, iconURL: thise.data.queue.songs[0].info.author.bestAvatar.url})
    .setTitle("Now playing the following:")
  .addField("Name:", `[${thise.data.queue.songs[0].info.title}](${thise.data.queue.songs[0].url})`, true)
  .addField("Length:", `${thise.data.queue.songs[0].info.duration}`, true)
  try{
    thise.data.textChannel.send({embeds: [embed]})
  } catch(err){
    console.log(err)
  }
}