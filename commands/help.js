const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
	.setName('help')
	.setDescription('gives list of commands and other useful information'),
	async execute(interaction) {
		interaction.reply({content: interaction.options._hoistedOptions[0].value, ephemeral: true})
	},
};