const Discord = require("discord.js")
const disPages = require("discord.js-embed-pages")
module.exports = {
  triggers: ["help", "h", "commands", "command", "command-list", "commands-list", "commandslist", "commandlist"],
  usage: "help",
  permissions: [],
  description: "Shows list of commands.",
  run: async function(message, client) {
    let amountOfPages = Math.ceil(client.commands.length / 10)
    var pages = []
    for (var i = 0; i < amountOfPages; i++) {
      const embed = new Discord.MessageEmbed()
        .setColor(client.config.embed_colour)
        .setAuthor({ name: "Help page " + (i + 1) + " out of " + (amountOfPages), iconURL: client.user.avatarURL({ dynamic: true }) })
      for (var ii = i * 10; ii < (i + 1) * 10; ii++) {
        if (!client.commands[ii]) {
          i = amountOfPages * 10 + 1
        } else {
          embed.addField(client.commands[ii].usage, client.commands[ii].description)
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