module.exports = async function(client){
    const fs = require("fs").promises;
    client.commands = []
      let firstDir = await fs.readdir("./Commands")
      for (var i = 0; i < firstDir.length; i++) {
        try {
          let fil = require("../.." + "/Commands/" + firstDir[i])
          let js = {
            run: fil.run,
            triggers: fil.triggers,
            permissions: fil.permissions,
            usage: fil.usage,
            description: fil.description
          }
          client.commands.push(js)
          console.log("Loaded command: ".green.bold + firstDir[i].yellow.bold)
        } catch (err) {
          console.log((firstDir[i] + " failed to load!").bold.red)
          console.log(err)
        }
      }
  }