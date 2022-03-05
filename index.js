const Discord = require("discord.js");
const FLAGS = Discord.Intents.FLAGS;
const YTDL = require("ytdl-core");
const YTSR = require("ytsr");
const YTPL = require("ytpl");
const fs = require("fs");
const client = new Discord.Client({
  intents: [
    FLAGS.GUILD_MESSAGES,
    FLAGS.GUILD_EMOJIS_AND_STICKERS,
    FLAGS.GUILD_VOICE_STATES,
    FLAGS.GUILD_MESSAGE_REACTIONS,
    FLAGS.GUILDS,
    FLAGS.GUILD_VOICE_STATES
  ]
});
global.client = client;
client.players = []
require("./Functions/Start/BootUp.js")(client);