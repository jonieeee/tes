const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('test')
    .setDescription('Untuk test bot'), 
    async execute(interaction) {
        if(interaction.channel.id === '910459789472047139' || interaction.channel.id === '910459789472047139') {
            await interaction.reply({ content: 'Masuk', ephemeral: true });
        }
		else {
			await interaction.reply({content: `\`\`\`\nYou can't use this command on this channel\`\`\``, ephemeral: true});
		}
    }
}