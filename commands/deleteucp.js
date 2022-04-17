const { SlashCommandBuilder } = require('@discordjs/builders');
const con = require('../function/mysql');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('deleteucp')
    .setDescription('For delete UCP the player')
    .addMentionableOption(option => option.setName('tag')
	    .setDescription('Tag anyone for delete UCP')
	    .setRequired(true)),
    async execute(interaction) {
        const tag = await interaction.options.getMentionable('tag');
        if(interaction.channel.id === '896039338834542603' || interaction.channel.id === '896039355355914280') {
            if(!interaction.member.permissions.has('ADMINISTRATOR')) return await interaction.reply({content: `\`\`\`\nYou are not admin, you can't use this command\`\`\``, ephemeral: true}); 
            if(tag) {
                con.query(`SELECT * FROM ucp WHERE discordid = '${tag.id}'`, async (err, row) => {
                    if(row.length < 1) {
                        await interaction.reply({content: `\`\`\`\nThe ucp is not registered yet\`\`\``, ephemeral: true});
                        return;
                    }
                    else {
                        const c1 = row[0].character_1;
                        const c2 = row[0].character_2;
                        const c3 = row[0].character_3;
                        con.query(`DELETE FROM users WHERE username = '${c1}'`);
                        con.query(`DELETE FROM users WHERE username = '${c2}'`);
                        con.query(`DELETE FROM users WHERE username = '${c3}'`);
                        con.query(`DELETE FROM ucp WHERE discordid = '${tag.id}'`);
						//interaction.member.roles.remove('896039248355016754');
                        await interaction.reply(`**Berhasil Menghapus UCP <@${tag.id}>\nSilahkan register ulang <@${tag.id}>**`);
                    }
                }) 
            }
        }
        else {
			await interaction.reply({content: `\`\`\`\nYou can't use this command on this channel\`\`\``, ephemeral: true});
		}
    }
}