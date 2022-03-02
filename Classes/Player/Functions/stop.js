module.exports = async function(thise){
    await thise.data.audioPlayer.stop();
    await thise.data.connection.destroy()
    let ind = thise.client.players.findIndex(k=> k.id === thise.id)
    thise.client.players.splice(ind, 1);
    delete thise;
  }