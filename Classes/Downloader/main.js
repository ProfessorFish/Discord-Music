module.exports = class Downloader{
  constructor(){
    
  }
  static async downloadVideo(url){
    return await require("./Functions/downloadVideo.js")(url)
  }
}