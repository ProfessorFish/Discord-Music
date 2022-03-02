module.exports = {
    triggers: ["ping"],
    usage: "ping",
    permissions: [],
    description: "Get the bot's ping.",
    run: async function(message, client){
      let sent = message.createdTimestamp
      let send = await message.reply("Pinging...")
      let receive = send.createdTimestamp
      send.edit("Pong! " + (receive - sent) + "ms!");
      }
  }