module.exports = async function(url, client){
    const ytpl = require('ytpl');
  
  const playlist = await ytpl(url);
    var items = playlist.items;
    /*let streams = 
    for(var i = 0;i<items.length;i++){
      let stream
    }*/
  }