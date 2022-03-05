module.exports = class Player{
  constructor(client, vcChannel, textChannel){
    const { createAudioPlayer, AudioPlayerStatus, NoSubscriberBehavior } = require('@discordjs/voice');
    this.client = client;
    this.data = {
      queue: new client.classes.Queue(),
      vcChannel: vcChannel,
      connection: null,
      audioPlayer: createAudioPlayer({behaviors: {
                noSubscriber: NoSubscriberBehavior.Play
            }}),
      textChannel: textChannel
    }
    this.id = vcChannel.guild.id;
    client.players.push(this);
    this.data.audioPlayer.on(AudioPlayerStatus.Idle, async (oldState, newState) => {
      console.log("fin")
      await this.data.queue.playNext();
      if(this.data.queue.songs[0]){
	await this.playNext();
      } else{
        this.data.textChannel.send("Queue finished!\n:star: Thanks for using " + this.client.user.username + " :star:")
        await this.stop();
      }
});
    this.data.audioPlayer.on('error', error => {
      console.log("Uh oh stinky poo poo.")
	console.log(error);
	this.playNext();
});
  }
  async skip(){
    return await require("./Functions/skip.js")(this)
  }
  async resume(){
    return await require("./Functions/resume.js")(this)
  }
  async pause(){
    return await require("./Functions/pause.js")(this)
  }
  async stop(){
    return await require("./Functions/stop.js")(this);
  }
  async playNext(){
    return await require("./Functions/playNext.js")(this);
  }
  async start(){
    return await require("./Functions/start.js")(this);
  }
  async addSong(data){
    return await require("./Functions/addSong.js")(data, this);
  }
  async joinChannel(channelToJoin){
    return await require("./Functions/joinChannel.js")(channelToJoin, this);
  }
  async findChannel(guild){
    return await require("./Functions/findChannel.js")(guild, this);
  }
}