const { SlashCommandBuilder } = require('@discordjs/builders');
const config = require("./../config.json");
const servers = config.PINNED_CHANNELS.split(" ");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('pinned')
		.setDescription('Grabs a random hilarious pinned message'),
	async execute(interaction,client) {
        if(interaction.guildId === config.SERVER_TWO) {
            const channelId = servers[Math.floor(Math.random() * servers.length)]
            let channel = client.channels.cache.get(channelId);
            channel.messages.fetchPinned()
            .then((messages) => {
                const pins = [...messages]
                let randomPin = pins[Math.floor(Math.random() * pins.length)]
                const exampleEmbed = {
                    title: `Random hilarious message`,
                    description: "rereerere"
                };
                interaction.reply({embeds: [exampleEmbed]})
            })
        } else {
            interaction.reply("This command is not availiable in this server")
        }
	},
};