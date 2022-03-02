module.exports = async function(client) {
    const fs = require("fs").promises;
    var dirs = await fs.readdir("./Classes")
    client.classes = {}
    for(var i = 0;i<dirs.length;i++){
      client.classes[dirs[i]] = require("../../Classes/" + dirs[i] + "/main.js")
    }
  }