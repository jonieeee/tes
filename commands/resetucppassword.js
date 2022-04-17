const { SlashCommandBuilder } = require('@discordjs/builders');
const con = require('../function/mysql');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('resetucppassword')
    .setDescription('For reset password UCP the player')
    .addMentionableOption(option => option.setName('tag')
	    .setDescription('Tag anyone for reset password UCP')
	    .setRequired(true)),
    async execute(interaction) {
        const tag = await interaction.options.getMentionable('tag');
        if(interaction.channel.id === '896039338834542603' || interaction.channel.id === '896039355355914280' || interaction.channel.id === '923512714788225034') {
            if(!interaction.member.permissions.has('ADMINISTRATOR')) return await interaction.reply({content: `\`\`\`\nYou are not admin, you can't use this command\`\`\``, ephemeral: true}); 
            if(tag) {
                con.query(`SELECT * FROM ucp WHERE discordid = '${tag.id}'`, async (err, row) => {
                    if(row.length < 1) {
                        await interaction.reply({content: `\`\`\`\nThe ucp is not registered yet\`\`\``, ephemeral: true});
                        return;
                    }
                    else {
                        con.query(`UPDATE ucp SET password = 'None' WHERE discordid = '${tag.id}'`);
                        return interaction.reply(`UCP si <@${tag.id}> berhasil di reset passwordnya`);
                    }
                })
            }
        }
        else {
			await interaction.reply({content: `\`\`\`\nYou can't use this command on this channel\`\`\``, ephemeral: true});
		}
    }
}
