module.exports = async function(client){
    const colour = require("colors")
    const Discord = require("discord.js")
    client.functions = {}
      client.functions.slashButtonFlick = async function (interaction, pages, settings){
          if(!settings){
              settings = {
                  timeout: 60*1000,
                  buttons: {
                      delete: {
                          style: "red",
                          emoji: "❌",
                          text: "Delete"
                      },
                      forward: {
                          style: "green",
                          emoji: "⏩",
                          text: "Forward"
                      },
                      backward: {
                          style: "green",
                          emoji: "⏪",
                          text: "Backward"
                      }
                  },
                  extraRows: [],
                  extraPos: "below",
                  message: "",
                  ephemeral: "You do not own this embed!"
              }
          }
          var timeout = settings.timeout;
  
          const pageMovingButtons1 = new Discord.MessageButton()
          .setCustomId(`forward_button_embed`)
          .setLabel((settings.buttons.forward.text) ? settings.buttons.forward.text : "")
          .setEmoji(settings.buttons.forward.emoji)
          .setStyle(settings.buttons.forward.style)
  
          const pageMovingButtons2 = new Discord.MessageButton()
          .setCustomId(`back_button_embed`)
          .setLabel((settings.buttons.backward.text) ? settings.buttons.backward.text: "")
          .setEmoji(settings.buttons.backward.emoji)
          .setStyle(settings.buttons.backward.style)
  
          var pageMovingButtons = new Discord.MessageActionRow()
          pageMovingButtons.addComponents([pageMovingButtons2])
  
          if(settings.buttons.delete){
          const deleteEmbedButton = new Discord.MessageButton()
          .setCustomId("delete_button_embed")
          .setLabel((settings.buttons.delete.text) ? settings.buttons.delete.text: "")
          .setEmoji(settings.buttons.delete.emoji)
          .setStyle(settings.buttons.delete.style)
          pageMovingButtons.addComponents([deleteEmbedButton])
          }
          pageMovingButtons.addComponents([pageMovingButtons1])
          var currentPage = 0;
          var ar = settings.extraRows;
              if(settings.extraPos == "above"){
                  ar.push(pageMovingButtons)
              } else{
                  ar.splice(0,0,pageMovingButtons)
              }
          var m;
          if(settings.message){
              m = await interaction.reply({content: settings.message, components: ar, embeds: [await pages[0]], fetchReply: true});
          } else{
              m = await interaction.reply({components: ar, embeds: [await pages[0]], fetchReply: true})
          }
          const filter = (interaction) => interaction.message.id == m.id
          let js = {
              filter
          }
          if(timeout){
              js.time = timeout
          }
          const collector = interaction.channel.createMessageComponentCollector(js);
          collector.on('collect', async i => {
              if(!i.isButton)return;
              if(i.message.id == m.id && i.user.id == interaction.user.id){
              if(i.customId == "back_button_embed"){
                  if(currentPage - 1 < 0){
                      currentPage = pages.length - 1
                  } else{
                      currentPage -= 1;
                  }
              } else if(i.customId == "forward_button_embed"){
                  if(currentPage + 1 == pages.length){
                      currentPage = 0;
                  } else{
                      currentPage += 1;
                  }
              } else if(i.customId == "delete_button_embed"){
                  try{
                      m.delete();
                  } catch (err){
                      console.log(err)
                  }
              }
              if(i.customId == "back_button_embed" || i.customId == "forward_button_embed"){
                  if(settings.message){
                      m.edit({content: settings.message, components: ar, embeds: [await pages[currentPage]]});
                  } else{
                      m.edit({components: ar, embeds: [await pages[currentPage]]})
                  }
                  try{
                      i.deferUpdate();
                  } catch{
                      try{
                          i.defer(true);
                      } catch (err){
                          console.log("Cannot defer button!\nFull error:\n" + err)
                      }
                  }
              }
          } else{
              if(settings.ephemeral){
                  await i.reply(settings.ephemeral, {ephemeral: true})
              }
          }
          });
  }
    console.log("Added client functions".green.bold)
  }