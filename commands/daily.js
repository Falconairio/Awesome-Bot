const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('daily')
		.setDescription('Sends links for daily wordle and daily crossword.'),
	async execute(interaction) {
        const exampleEmbed = {
            title: `Daily crossword and wordle links`,
            description: `https://www.dictionary.com/e/crossword/\n
            https://www.nytimes.com/games/wordle/index.html`
            
          };
          interaction.reply({embeds: [exampleEmbed]})
	},
};