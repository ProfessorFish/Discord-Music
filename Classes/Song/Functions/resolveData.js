module.exports = async function(thise){
    let stream = await thise.client.classes.Downloader.downloadVideo(thise.url);
    let info = await thise.client.classes.Searcher.search(thise.url)
    thise.stream = stream;
    thise.info = info;
  }