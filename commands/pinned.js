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
                                        ? getAttachment.url
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
                    },1500)
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

function validURL(str) {
    var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
      '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
    return !!pattern.test(str)
}
