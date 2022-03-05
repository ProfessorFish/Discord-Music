module.exports = class Song{
  constructor(data){
    this.url = data.url;
    this.title = data.title;
    this.stream = null;
    this.info = null;
    this.length = data.length;
    this.pauseTime = 0;
    this.startPause = 0;
    this.startTime = Date.now();
    this.client = global.client;
  }
  async resolveData(){
    return await require("./Functions/resolveData.js")(this)
  }
}