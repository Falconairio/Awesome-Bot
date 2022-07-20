const Discord = require("discord.js");
const fs = require('fs');
const client = new Discord.Client({intents: ["GUILDS", "GUILD_MESSAGES"]});

const rat = require("./commands/rat");
const fortune = require("./commands/fortune")
const echo = require("./commands/echo")
const cool = require("./commands/cool")
const quote = require("./commands/quote")
const pinned = require("./commands/pinned")

const config = require("./config.json");

client.on('ready', () => {
  console.log('Ready!');
  client.user.setActivity("/help")
});


client.on('interactionCreate', async interaction => {
  if (interaction.user.bot) return;
	if (!interaction.isCommand()) return;

  else if(interaction.commandName === "rat") {
    await rat.execute(interaction)
  } 

  else if(interaction.commandName === "fortune") {
    await fortune.execute(interaction)
  } 

  else if(interaction.commandName === "echo") {
    await echo.execute(interaction)
  }

  else if(interaction.commandName === "cool") {
    await cool.execute(interaction)
  }

  else if(interaction.commandName === "pinned") {
    await pinned.execute(interaction,client)
  } 

  else if(interaction.commandName === "quote") {
    try {
      fs.readFile('preferences.json', 'utf-8', (err, data) => {
        if (err) {
            throw err;
        }
    
        const serversObj = JSON.parse(data.toString());

        if(serversObj[interaction.guildId]) {
          quote.execute(interaction,client,serversObj[interaction.guildId])
        } else {
          interaction.reply({ content: "Quote channel has not been assigned properly for this server.", ephemeral: true})
        }
      });
    } catch (error) {
      interaction.reply({ content: "something went wrong with the request", ephemeral: true })
    }
  }
  
  else if(interaction.commandName === "set") {
    try {
      quoteChannelId = interaction.channelId;

      fs.readFile('preferences.json', 'utf-8', (err, data) => {
        if (err) {
            throw err;
        }
    
        const serversObj = JSON.parse(data.toString());

        serversObj[interaction.guildId] = quoteChannelId
        const newData = JSON.stringify(serversObj);

        fs.writeFile('preferences.json', newData, (err) => {
          if (err) {
              throw err;
          }
          console.log("JSON data is saved.");
        });
    });

      interaction.reply({ content: "quote channel changed successfully!", ephemeral: true})
    } catch(err) {
      interaction.reply({ content:"failure to change quote channel", ephemeral: true})
    }
  } 
});


client.login(config.BOT_TOKEN);