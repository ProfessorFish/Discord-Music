module.exports = async function(client) {
    const colour = require("colors")
    client.config = {
      prefix: "?",
      embed_colour: "YELLOW"
    }
    console.log("Added config to client.".green.bold)
    }