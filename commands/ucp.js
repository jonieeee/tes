const { SlashCommandBuilder } = require('@discordjs/builders');
const con = require('../function/mysql');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('ucp')
    .setDescription('For check UCP the player')
    .addMentionableOption(option => option.setName('tag')
	    .setDescription('Tag anyone for check UCP')
	    .setRequired(true)),
    async execute(interaction) {
        const tag = await interaction.options.getMentionable('tag');
        if(interaction.channel.id === '896039338834542603' || interaction.channel.id === '896039355355914280') {
            if(tag) {
                con.query(`SELECT * FROM ucp WHERE discordid = '${tag.id}'`, async (err, row) => {
                    if(row.length < 1) {
                        await interaction.reply(`si <@${tag.id}> belum register UCP`);
                        return;
                    }
                    else {
                        return interaction.reply(`UCP si <@${tag.id}> adalah **${row[0].name}**`);
                    }
                })
            }
        }
        else {
			await interaction.reply({content: `\`\`\`\nYou can't use this command on this channel\`\`\``, ephemeral: true});
		}
    }
}
