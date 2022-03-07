const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('embed')
		.setDescription('Creates a test embed.'),
	async execute(interaction) {
        messageSplit = message.content.split(" ");
        const exampleEmbed = {
          title: `test embed`,
          description: `${messageSplit.slice(1,messageSplit.length).join(" ")}`
        };
        message.reply({embeds: [exampleEmbed]})
	},
};