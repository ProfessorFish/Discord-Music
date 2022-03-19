module.exports = async function(prompt, client){
  const ytpl = require("ytpl")
  const ytsr = require("ytsr")
  try{
  const filters1 = await ytsr.getFilters(prompt);
  const filter1 = filters1.get('Type').get('Video');
  const result = await ytsr(filter1.url);
  return result.items.find(k=> k.type === "video");
  } catch(err){
    if(!await ytpl(prompt)){
      return false
    } else{
      var playlist = await ytpl(prompt, {
        limit: Infinity,
        pages: Infinity
      });
      return playlist.items;
    }
  }
}
