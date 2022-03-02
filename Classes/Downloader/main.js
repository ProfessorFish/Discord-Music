module.exports = class Downloader{
    constructor(){
      
    }
    static async downloadPlaylist(url){
      return await require("./Functions/downloadPlaylist.js")(url)
    }
    static async downloadVideo(url){
      return await require("./Functions/downloadVideo.js")(url)
    }
  }