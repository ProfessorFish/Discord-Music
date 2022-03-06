const Discord = require("discord.js");
const { createReadStream } = require('fs');
const { createAudioResource, StreamType, createAudioPlayer } = require('@discordjs/voice');
const ytdl = require("ytdl-core")
const { SlashCommandBuilder } = require('@discordjs/builders');
module.exports = {
  triggers: ["skip", "s"],
  usage: "skip",
  permissions: [],
  slashData: new SlashCommandBuilder()
	.setName('skip')
	.setDescription("Skip the currently playing song."),
  description: "Skip the currently playing song.",
  run: async function(message, client) {
    var userVC = message.member.voice.channel
    if (!userVC || typeof userVC === Discord.StageChannel) {
      return message.channel.send("Not in a voice channel!")
    }
    if (message.guild.me.voice.channel && message.member.voice.channel != message.guild.me.voice.channel) {
      return message.channel.send("You are not in the channel I am currently playing in: <#" + message.guild.me.voice.channel.id + ">")
    }
    var thisPlayer = client.players.find(k=> k.id === message.guild.id)
    await thisPlayer.skip();
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
    interaction.reply({content: "Skipping...", fetchReply: true}).then(k=> k.delete())
    await thisPlayer.skip();
  }
}