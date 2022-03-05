module.exports = async function(thise){
  thise.data.textChannel.send("Queue finished!\n:star: Thanks for using " + thise.client.user.username + " :star:");
  (thise.data.audioPlayer) ?  thise.data.audioPlayer.stop() : null;
  (thise.data.connection) ?  thise.data.connection.destroy() : null;
  let ind = thise.client.players.findIndex(k=> k.id === thise.id)
  thise.client.players.splice(ind, 1);
  delete thise;
}