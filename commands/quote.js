/* This is the code for the quote command. It grabs a random quote from the quotes channel. */
const { SlashCommandBuilder } = require('@discordjs/builders');
const { default: axios } = require('axios');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('quote')
		.setDescription('Grabs a random quote from the quotes channel')
        .addStringOption(option => option.setName('person').setDescription('Grabs a quote from the specified person'))
        .addBooleanOption(option => option.setName('recent').setDescription('Grabs most recent quote')),
	async execute(interaction,client,quoteChannelId) {
            const channel = client.channels.cache.get(quoteChannelId);

            if(channel) {
                const recent = interaction.options.getBoolean('recent');
                const person = interaction.options.getString('person');

                try {
                    channel.messages.fetch({ limit: 100 }).then(messages => {
                        let arraymessages;
                        if(person !== null) {
                            arraymessages = messages.filter((el) => el.content.includes(":") 
                            && el.content.substring(0, el.content.indexOf(":")).toLowerCase().includes(person.toLowerCase()));
                        } else {
                            arraymessages = messages.filter((el) => el.content.includes(":"));
                        }
                        let quotes = arraymessages.map((el) => el.content)

                        if(quotes.length == 0) {
                            interaction.reply({content: "No quotes were found with your specified options.", ephemeral: true})
                        } else {
                            let chosenQuote;
                            if(recent) {
                                chosenQuote = quotes[0]
                            } else {
                                chosenQuote = quotes[Math.floor(Math.random() * quotes.length)]
                            }
            
                            let name = chosenQuote.substring(0, chosenQuote.indexOf(":"))
                            let quote = chosenQuote.substring(chosenQuote.indexOf(":") + 1, chosenQuote.length)
            
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
                } catch (err) {
                    interaction.reply({content: "Error getting quote.", ephemeral: true})
                }
            } else {
                interaction.reply({ content: "Quote channel has not been assigned properly for this server.", ephemeral: true})
            }
	},
};

