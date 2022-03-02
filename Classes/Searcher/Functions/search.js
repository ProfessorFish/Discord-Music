module.exports = async function(prompt){
    const ytpl = require("ytpl")
    const ytsr = require("ytsr")
    const filters1 = await ytsr.getFilters(prompt);
  const filter1 = filters1.get('Type').get('Video');
    const result = await ytsr(filter1.url, {
      limit: 1
    })
    return result.items[0];
  }