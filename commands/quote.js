const { SlashCommandBuilder } = require('@discordjs/builders');
const { default: axios } = require('axios');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('quote')
		.setDescription('Grabs a random quote from the quotes channel'),
	async execute(interaction,client) {
		const channel = client.channels.cache.get("935222826649133076");
        channel.messages.fetch({ limit: 100 }).then(messages => {
            let arraymessages = messages.filter((el) => el.content.includes(":"));
            let quotes = arraymessages.map((el) => el.content)
            let randomQuote = quotes[Math.floor(Math.random() * quotes.length)]

            let name = randomQuote.substring(0, randomQuote.indexOf(":"))
            let quote = randomQuote.substring(randomQuote.indexOf(":") + 1, randomQuote.length)
            let photoUrl;
            axios.get('https://picsum.photos/250').then((res) => {
                photoUrl = res.request.res.responseUrl
                const exampleEmbed = {
                    title: `${quote}`,
                    description: `*-${name}*`,
                    image: {
                        url: `${photoUrl}`
                    }
                  };
                  interaction.reply({embeds: [exampleEmbed]})
            })
          })
	},
};