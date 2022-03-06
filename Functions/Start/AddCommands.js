module.exports = async function(client) {
  const fs = require("fs").promises;
  const { REST } = require('@discordjs/rest');
  const { Routes } = require('discord-api-types/v9');
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
        description: fil.description,
        slashData: fil.slashData.toJSON(),
        slash: fil.slash
      }
      client.commands.push(js)
      console.log("Loaded command: ".green.bold + firstDir[i].yellow.bold)
    } catch (err) {
      console.log((firstDir[i] + " failed to load!").bold.red)
      console.log(err)
    }
  }
  const rest = new REST({ version: '9' }).setToken(client.config.token);
  (async () => {
	try {
		console.log('Started refreshing application (/) commands.'.yellow.bold);
    let slashData = [];
    for(var i = 0;i<client.commands.length;i++){
      slashData.push(client.commands[i].slashData)
    }
		await rest.put(
		//IF YOUR BOT IS JUST FOR ONE GUILD, REMOVE THE // ON THE LINE BELOW, CHANGE 729965213788536902 TO YOUR GUILD(SERVER) ID AND ADD // TO THE LINE BELOW THE LINE YOU JUST REMOVED THE // FROM 
      //Routes.applicationGuildCommands(client.config.id, "729965213788536902"),{ body: slashData });
      Routes.applicationCommands(clientId),{ body: commands },)
		console.log('Successfully reloaded application (/) commands.'.green.bold);
	} catch (error) {
		console.error(error);
	}
})();
}