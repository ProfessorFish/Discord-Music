module.exports = async function(data, thise){
  const { toMilliseconds } = require("colon-notation");
  let newSong = await new thise.client.classes.Song({
    title: data.title,
    url: (data.shortUrl) ? data.shortUrl : data.url,
    length: toMilliseconds(data.duration)
  });
  thise.data.queue.add(newSong);
  if(thise.data.audioPlayer.state.status === "idle"){
    await thise.playNext();
  }
}