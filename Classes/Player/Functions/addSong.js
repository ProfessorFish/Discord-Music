module.exports = async function(url, info, thise){
    let stream = await thise.client.classes.Downloader.downloadVideo(url)
    let newSong = await new thise.client.classes.Song(url, info, stream);
    thise.data.queue.add(newSong);
    if(thise.data.audioPlayer.state.status === "idle"){
      thise.playNext()
    }
  }