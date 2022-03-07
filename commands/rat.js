const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('rat')
		.setDescription('Replies with a random rat gif'),
	async execute(interaction) {
		const exampleEmbeds = [{
            title: "dancing rat 1",
            image: {
              url: "https://c.tenor.com/uLYv3MFt2HwAAAAd/rat-dancing-rat.gif"
            }
          }, {
            title: "dancing rat 2",
            image: {
              url: "https://c.tenor.com/vOZEKSmPJz4AAAAd/rat-dancing.gif"
            }
          }, {
            title: "rat eating spaghetti",
            image: {
              url: "https://media4.giphy.com/media/CBdAAvsd63x5u/giphy.gif?cid=82a1493bp53huq6zbs373x73z5ziew0jbl4rfyxnx15n925g&rid=giphy.gif&ct=g"
            }
          }, {
            title: "rat eating banana",
            image: {
              url: "https://64.media.tumblr.com/5efa4669a75d134dc082978377a06193/3a715b2bc4a1d662-73/s400x600/fe6fb9ee24f708c3bc969bea00590c5c5faee54f.gif"
            }
          }];
          const chosenRatEmbed = exampleEmbeds[Math.floor(Math.random() * exampleEmbeds.length)]
          await interaction.reply({embeds: [chosenRatEmbed]})
        
	},
};