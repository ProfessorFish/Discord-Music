module.exports = class Searcher{
  constructor(){
    
  }
  static async search(prompt, client){
    return await require("./Functions/search.js")(prompt, client)
  }
}