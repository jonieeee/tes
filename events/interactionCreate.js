module.exports = {
    name: 'interactionCreate',
    description: 'Untuk mendeteksi jika ada yang memakai slash command',
	async execute(interaction) {

	    if (interaction.isCommand()){
            const command = interaction.client.commands.get(interaction.commandName);

            if (!command) return;

            try {
                console.error(`'${interaction.user.tag}' Menggunakan Command '${command.data.name}'`);
                await command.execute(interaction); 
            } catch (error) {
                console.error(error);
                return interaction.reply({ content: 'Command masih dalam pengembangan', ephemeral: true });
            }
        }
	},
};