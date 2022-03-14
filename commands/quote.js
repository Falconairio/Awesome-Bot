const { SlashCommandBuilder } = require('@discordjs/builders');
const { default: axios } = require('axios');
const config = require("./../config.json");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('quote')
		.setDescription('Grabs a random quote from the quotes channel'),
	async execute(interaction,client) {
        if(interaction.guildId === config.SERVER_ONE) {
            const channel = client.channels.cache.get(`${config.QUOTES_CHANNEL}`);
            channel.messages.fetch({ limit: 100 }).then(messages => {
                let arraymessages = messages.filter((el) => el.content.includes(":"));
                let quotes = arraymessages.map((el) => el.content)
                let randomQuote = quotes[Math.floor(Math.random() * quotes.length)]

                if(interaction.options._hoistedOptions[0] == null) {
                    let name = randomQuote.substring(0, randomQuote.indexOf(":"))
                    let quote = randomQuote.substring(randomQuote.indexOf(":") + 1, randomQuote.length)

                    axios.get('https://picsum.photos/250').then((res) => {
                        let photoUrl = res.request.res.responseUrl
                        const exampleEmbed = {
                            title: `${quote}`,
                            description: `*-${name}*`,
                            image: {
                                url: `${photoUrl}`
                            }
                        };
                        interaction.reply({embeds: [exampleEmbed]})
                    })
                }
            })
            } else {
                interaction.reply("This command is not availiable in this server")
            }
	},
};

