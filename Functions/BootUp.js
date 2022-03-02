module.exports = async function(client){
    const fs = require("fs").promises;
    const colors = require("colors")
  var thisDir = await fs.readdir(__dirname);
    let thisFileIND = thisDir.findIndex(k=> k === "BootUp.js")
    thisDir.splice(thisFileIND, 1)
  for(var i = 0;i<thisDir.length;i++){
    await require("./" + thisDir[i])(client);
    console.log("Loaded: ".green.bold + thisDir[i].yellow.bold)
  }
  }