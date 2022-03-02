module.exports = async function(client){
    const fs = require("fs").promises;
    let firstDir = await fs.readdir("./Events")
      var files = []
      for (var i = 0; i < firstDir.length; i++) {
        let fils = await fs.readdir("./Events/" + firstDir[i])
        for (var ii = 0; ii < fils.length; ii++) {
          let fil = require("../.." + "/Events/" + firstDir[i] + "/" + fils[ii])
          client.on(fil.event, function(data){fil.run(data, client)})
          console.log("Loaded event: ".green.bold + fil.event.yellow.bold)
        }
      }
  }