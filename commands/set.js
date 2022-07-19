const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
	.setName('set')
	.setDescription('Sets this channel to be designated as the quote channel')
};