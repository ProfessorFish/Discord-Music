module.exports = class Searcher{
    constructor(){
      
    }
    static async search(prompt){
      return await require("./Functions/search.js")(prompt)
    }
  }