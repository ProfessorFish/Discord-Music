module.exports = async function(thise){
    await thise.joinChannel(thise.data.vcChannel)
        thise.data.connection.subscribe(thise.data.audioPlayer)
  }