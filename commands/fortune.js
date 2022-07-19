const { SlashCommandBuilder } = require('@discordjs/builders');
const emojis = require("./../myjsonfile.json")

module.exports = {
	data: new SlashCommandBuilder()
		.setName('fortune')
		.setDescription('Give your fortune by selecting three random emojis')
    .addBooleanOption(option => option.setName('publish').setDescription('Let others see your fortune')),
	async execute(interaction) {
        let exampleEmbed
        const publish = interaction.options.getBoolean('publish');
        let selectedEmoji = emojis[Math.floor(Math.random() * emojis.length)];
        let selectedEmoji2 = emojis[Math.floor(Math.random() * emojis.length)];
        let selectedEmoji3 = emojis[Math.floor(Math.random() * emojis.length)];

        if(publish) {
          exampleEmbed = {
            title: `${interaction.user.username}'s Fortune:`,
            description: `${selectedEmoji} + ${selectedEmoji2} + ${selectedEmoji3}`
          };
          interaction.reply({embeds: [exampleEmbed]})
        } else {
          exampleEmbed = {
            title: "Your Fortune:",
            description: `${selectedEmoji} + ${selectedEmoji2} + ${selectedEmoji3}`
          };
          interaction.reply({embeds: [exampleEmbed], ephemeral: true})
        }
	},
};