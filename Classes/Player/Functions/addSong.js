module.exports = async function(data, thise){
  const { toMilliseconds } = require("colon-notation");
  let newSong = await new thise.client.classes.Song({
    title: data.title,
    url: (data.shortUrl) ? data.shortUrl : data.url,
    length: toMilliseconds(data.duration)
  });
  await thise.data.queue.add(newSong);
  if(thise.data.audioPlayer.state.status === "idle"){
    await thise.data.queue.songs[0].resolveData()
    await thise.playNext();
  }
}