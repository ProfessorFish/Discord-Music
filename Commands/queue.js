const Discord = require("discord.js");
const disPages = require("discord.js-embed-pages");
module.exports = {
  triggers: ["queue", "q"],
  usage: "queue",
  permissions: [],
  description: "Get the server's queue.",
  run: async function(message, client){
    let thisPlayer = client.players.find(k=> k.id === message.guild.id)
    if(!thisPlayer)return message.channel.send("No music playing!")
    var thisQueue = thisPlayer.data.queue;
    var thisSongs = thisQueue.songs;
    let amountOfPages = Math.ceil(thisSongs.length / 10)
    console.log(thisSongs)
    var pages = []
    for (var i = 0; i < amountOfPages; i++) {
      const embed = new Discord.MessageEmbed()
        .setColor(client.config.embed_colour)
        .setAuthor({ name: "Queue page " + (i + 1) + " out of " + (amountOfPages), iconURL: client.user.avatarURL({ dynamic: true }) })
      for (var ii = i * 10; ii < (i + 1) * 10; ii++) {
        if (!thisSongs[ii]) {
          i = amountOfPages * 10 + 1
        } else {
          embed.addField((ii === 0) ? "Now playing:" : "Position " + ii.toString() + ":", `[${thisSongs[ii].info.title}](${thisSongs[ii].url})`)
        }
      }
      pages.push(embed)
    }
    disPages.buttonFlick(message, pages, {
      timeout: 60 * 1000,
      buttons: {
        delete: {
          style: "DANGER",
          emoji: "❌",
          text: ""
        },
        forward: {
          style: "SUCCESS",
          emoji: "⏩",
          text: ""
        },
        backward: {
          style: "SUCCESS",
          emoji: "⏪",
          text: ""
        }
      },
      extraRows: [],
      extraPos: "below",
      message: "",
      ephemeral: false
    })
  }
}