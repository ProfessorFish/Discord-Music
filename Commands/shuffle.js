const Discord = require("discord.js");
const { SlashCommandBuilder } = require('@discordjs/builders');
module.exports = {
  triggers: ["shuffle"],
  usage: "shuffle",
  permissions: [],
  slashData: new SlashCommandBuilder()
	.setName('shuffle')
	.setDescription("Shuffle the queue."),
  description: "Shuffle the queue.",
  run: async function(message, client) {
    var userVC = message.member.voice.channel
    if (!userVC || typeof userVC === Discord.StageChannel) {
      return message.channel.send("Not in a voice channel!")
    }
    if (message.guild.me.voice.channel && message.member.voice.channel != message.guild.me.voice.channel) {
      return message.channel.send("You are not in the channel I am currently playing in: <#" + message.guild.me.voice.channel.id + ">")
    }
    var thisPlayer = client.players.find(k=> k.id === message.guild.id)
    if(!thisPlayer.data.queue.songs[1])return message.channel.send("No songs to shuffle!")
    await thisPlayer.shuffle();
},
  slash: async function(interaction, client){
    var userVC = interaction.member.voice.channel
    if (!userVC || typeof userVC === Discord.StageChannel) {
      return interaction.reply("Not in a voice channel!")
    }
    if (interaction.guild.me.voice.channel && interaction.member.voice.channel != interaction.guild.me.voice.channel) {
      return interaction.reply("You are not in the channel I am currently playing in: <#" + interaction.guild.me.voice.channel.id + ">")
    }
    var thisPlayer = client.players.find(k=> k.id === interaction.guild.id)
    if(!thisPlayer.data.queue.songs[1])return interaction.channel.send("No songs to shuffle!")
    interaction.reply({content: "Shuffling...", fetchReply: true}).then(k=> k.delete())
    await thisPlayer.shuffle();
  }
}