module.exports = async function(thise){
    const Discord = require("discord.js");
    let newArr = [];
    let songs = thise.data.queue.songs;
    let length = songs.length - 1;
    for(var i = 0;i<length;i++){
     let ranNum = Math.floor(Math.random() * (songs.length - 1)) + 1
      newArr.push(songs[ranNum]);
      songs.splice(ranNum, 1);
    }
    thise.data.queue.songs = thise.data.queue.songs.concat(newArr);
    const embed = new Discord.MessageEmbed()
      .setColor(thise.client.config.embed_colour)
      .setThumbnail(thise.data.queue.songs[0].info.bestThumbnail.url)
      .setAuthor({name: "Queue shuffled", iconURL: thise.client.user.avatarURL({dynamic: true})})
      .setTitle("Shuffled Queue.")
    .setFooter({text: "Run: " + thise.client.config.prefix + "queue to see the new queue!"})
    thise.data.textChannel.send({embeds: [embed]})
  }