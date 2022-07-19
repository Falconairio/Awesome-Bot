const Discord = require("discord.js");
const client = new Discord.Client({intents: ["GUILDS", "GUILD_MESSAGES"]});

const rat = require("./commands/rat");
const fortune = require("./commands/fortune")
const echo = require("./commands/echo")
const cool = require("./commands/cool")
const quote = require("./commands/quote")
const pinned = require("./commands/pinned")

const config = require("./config.json");

let quoteChannelId = "";

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

  else if(interaction.commandName === "quote") {
    await quote.execute(interaction,client,quoteChannelId)
  }

  else if(interaction.commandName === "pinned") {
    await pinned.execute(interaction,client)
  } 
  
  else if(interaction.commandName === "set") {
    try {
      quoteChannelId = interaction.channelId;
      interaction.reply({ content: "quote channel changed successfully!", ephemeral: true})
    } catch(err) {
      interaction.reply("failure to change quote channel")
    }
  } 
});


client.login(config.BOT_TOKEN);