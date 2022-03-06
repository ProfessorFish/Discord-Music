const { SlashCommandBuilder } = require('@discordjs/builders');
module.exports = {
  triggers: ["ping"],
  usage: "ping",
  permissions: [],
  slashData: new SlashCommandBuilder()
	.setName('ping')
	.setDescription("Get the bot's ping."),
  description: "Get the bot's ping.",
  run: async function(message, client){
    let sent = message.createdTimestamp
    let send = await message.reply("Pinging...")
    let receive = send.createdTimestamp
    send.edit("Pong! " + (receive - sent) + "ms!");
    },
  slash: async function(interaction, client){
    let sent = interaction.createdTimestamp
    let send = await interaction.reply({content: "Pinging...", fetchReply: true})
    let receive = send.createdTimestamp
    send.edit("Pong! " + (receive - sent) + "ms!");
  }
}