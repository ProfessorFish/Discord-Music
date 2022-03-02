module.exports = class Queue {
    constructor(songs) {
      this.songs = []
    }
    async playNext(){
      return await require("./Functions/playNext.js")(this);
    }
    async add(song){
      return await require("./Functions/add.js")(song, this)
    }
  }