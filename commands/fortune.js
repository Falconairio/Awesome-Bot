const { SlashCommandBuilder } = require('@discordjs/builders');
const emojis = require("./../myjsonfile.json")

module.exports = {
	data: new SlashCommandBuilder()
		.setName('fortune')
		.setDescription('Give your fortune by selecting three random emojis'),
	async execute(interaction) {
        let selectedEmoji = emojis[Math.floor(Math.random() * emojis.length)];
        let selectedEmoji2 = emojis[Math.floor(Math.random() * emojis.length)];
        let selectedEmoji3 = emojis[Math.floor(Math.random() * emojis.length)];
    
        const exampleEmbed = {
          title: `${interaction.user.username}'s Fortune:`,
          description: `${selectedEmoji} + ${selectedEmoji2} + ${selectedEmoji3}`
        };
        interaction.reply({embeds: [exampleEmbed]})
	},
};