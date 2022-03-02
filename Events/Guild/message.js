module.exports = {
    event: "messageCreate",
    run: async function(message, client){
      if(message.author.bot || message.channel.type === "dm")return
      let args = message.content.toLowerCase().split(" ")
      let c = client.commands.find(k=> k.triggers.find(l=> client.config.prefix + l === args[0]))
      if(!c)return
      var perms = true;
      c.permissions.find(k=> k === "botowner") && !client.config.owner.find(k=> k === message.author.id) ? perms = false : null;
      for(var i = 0;i<c.permissions.length && perms;i++){
        if(c.permissions[i] != "botowner" && !message.member.permissions.has(c.permissions[i]))perms = false;
      }
      if(perms)c.run(message,client)
      else return message.reply("Invalid permission!\nRequired permission(s):\n**" + c.permissions.join("\n") + "\n**")
    }
  }