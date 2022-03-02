require("colors")
module.exports = {
  event: "ready",
  run: async function(data, client){
    console.log("Logged in as ".green + client.user.tag.yellow)
    var iteration = 0;
    let chosen = client.statuses[iteration]
      client.user.setActivity(chosen.text + " || ?help", {type: chosen.type})
    setInterval(async function(){
      let chosen = client.statuses[iteration]
      client.user.setActivity(chosen.text + " || ?help", {type: chosen.type})
      iteration++;
      if(iteration >= client.statuses.length)iteration = 0;
    }, 30 * 1000)
  }
}