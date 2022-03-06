module.exports = async function(client){
  const fs = require("fs").promises;
  const colour = require("colors")
var thisDir = await fs.readdir(__dirname);
  let thisFileIND = thisDir.findIndex(k=> k === "BootUp.js")
  thisDir.splice(thisFileIND, 1)
  client.config = {
    prefix: "?",
    embed_colour: "YELLOW",
    token: process.env.TOKEN,
    id: "825406975545442325"
  }
  console.log("Added config to client.".green.bold)
for(var i = 0;i<thisDir.length;i++){
  await require("./" + thisDir[i])(client);
  console.log("Loaded: ".green.bold + thisDir[i].yellow.bold)
}
}