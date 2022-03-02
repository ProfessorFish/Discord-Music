module.exports = class Song{
    constructor(url, info, stream){
      this.url = url;
      this.stream = stream;
      this.info = info;
      this.pauseTime = 0;
      this.startPause = 0;
      this.startTime = Date.now();
    }
  }