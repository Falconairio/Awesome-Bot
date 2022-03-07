const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('cool')
		.setDescription('Tells you if the specified user is cool or not.')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('The user to analyze')
                .setRequired(false)),
	async execute(interaction) {
        if(interaction.options._hoistedOptions[0] == null) {
            let stringSplit = interaction.user.id.split("");
            let lastnumber = parseInt(stringSplit[stringSplit.length - 1]);
        
            (lastnumber % 2 === 0)
            ? interaction.reply(`${interaction.user.username} you are cool`)
            : interaction.reply(`${interaction.user.username} you are not cool`)
        } else {
            let userId = interaction.options._hoistedOptions[0].user.id
            let lastnumber = parseInt(userId[userId.length - 2]);

            (lastnumber % 2 === 0)
            ? interaction.reply(`<@${userId}> is cool`)
            : interaction.reply(`<@${userId}> is not cool`)
        }
    }
};