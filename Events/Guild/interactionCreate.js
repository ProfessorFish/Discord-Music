module.exports = {
    event: "interactionCreate",
    run: async function(interaction, client){
      if (!interaction.isCommand()) return;
      let commandName = interaction.commandName;
      let c = client.commands.find(k=> k.triggers.find(l=> l === commandName))
      if(!c)return
      var perms = true;
      c.permissions.find(k=> k === "botowner") && !client.config.owner.find(k=> k === interaction.user.id) ? perms = false : null;
      for(var i = 0;i<c.permissions.length && perms;i++){
        if(c.permissions[i] != "botowner" && !interaction.member.permissions.has(c.permissions[i]))perms = false;
      }
      if(perms)c.slash(interaction,client)
      else return interaction.reply("Invalid permission!\nRequired permission(s):\n**" + c.permissions.join("\n") + "\n**")
    }
  }