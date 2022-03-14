const Discord = require("discord.js");
const client = new Discord.Client({intents: ["GUILDS", "GUILD_MESSAGES"]});

const rat = require("./commands/rat");
const ping = require("./commands/ping");
const fortune = require("./commands/fortune")
const echo = require("./commands/echo")
const cool = require("./commands/cool")
const daily = require("./commands/daily")
const quote = require("./commands/quote")
const pinned = require("./commands/pinned")

const config = require("./config.json");
const servers = config.SERVERS.split(" ");

client.on('ready', () => {
  console.log('Ready!');
  client.user.setStatus('available')
  client.user.setActivity("stinky"
  , {
    type: "STREAMING",
    url: "https://www.youtube.com/watch?v=SjHUb7NSrNk"
  }
  );
});


client.on('interactionCreate', async interaction => {
  if (interaction.user.bot) return;
  if(!servers.includes(interaction.guildId)) return;
	if (!interaction.isCommand()) return;

	if (interaction.commandName === 'ping') {
		await ping.execute(interaction,client)
	}

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

  else if(interaction.commandName === "daily") {
    await daily.execute(interaction)
  } 
  else if(interaction.commandName === "quote") {
    await quote.execute(interaction,client)
  }
  else if(interaction.commandName === "pinned") {
    await pinned.execute(interaction,client)
  }
});


client.login(config.BOT_TOKEN);