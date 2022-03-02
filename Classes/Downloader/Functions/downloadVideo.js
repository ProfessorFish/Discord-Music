module.exports = async function(url){
    const ytdl = require('play-dl')
    return await ytdl.stream(url, {discordPlayerCompatibility: true});
  }