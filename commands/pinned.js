const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('pinned')
		.setDescription('Grabs a random hilarious pinned message'),
	async execute(interaction,client) {
            interaction.reply({embeds: [{
                title: `grabbing random pinned message...`,
                description: "please wait."
            }]})
            await interaction.guild.channels.fetch().then((data) => {
                let textChannels = data.filter((el) => el.type === "GUILD_TEXT")
                let channels = textChannels.map((el) => el);
                let pinnedMessagesArray = []
                getAllPinnedMessages(channels,pinnedMessagesArray)
                .then(() => {
                    setTimeout(() => {
                        try {
                            let randomPin = pinnedMessagesArray[Math.floor(Math.random() * pinnedMessagesArray.length)]
                            const exampleEmbed = {
                                title: `${randomPin.content.substring(0,256)}`,
                                description: `-*${randomPin.author.username}*`,
                                image: {
                                    url: `${
                                        (randomPin.attachments.size > 0)
                                        ? `${getAttachment(randomPin.attachments)}`
                                        : ""
                                    }`
                                }
                            };
                            interaction.editReply({embeds: [exampleEmbed]})
                          }
                          catch(err) {
                            console.log(err)
                            interaction.editReply({embeds: [{
                                title: `pinned message acquisition failed`,
                                description: "very sad"
                            }]})
                          }
                    },2000)
                })
            })
	},
};

async function getAllPinnedMessages(channels,array) {
    for(let i = 0; i < channels.length; i++) {
        channels[i].messages.fetchPinned()
        .then((messages) => {
            const pins = messages.map((el) => el)
            pins.forEach((el) => array.push(el))
        })
    }
}

function getAttachment(collection) {
    let array = collection.map((el) => el)
    return array[0].url
}