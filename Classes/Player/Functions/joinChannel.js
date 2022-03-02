module.exports = async function(channelToJoin, thise){
    const { joinVoiceChannel } = require('@discordjs/voice');
  
  const connection = joinVoiceChannel({
      channelId: channelToJoin.id,
      guildId: channelToJoin.guild.id,
      adapterCreator: channelToJoin.guild.voiceAdapterCreator,
  });
      thise.data.connection = connection;
    return connection;
    }