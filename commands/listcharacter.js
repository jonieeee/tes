const { SlashCommandBuilder } = require('@discordjs/builders');
const con = require('../function/mysql');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('listcharacter')
    .setDescription('For check list the player')
    .addMentionableOption(option => option.setName('tag')
	    .setDescription('Tag anyone for show list character')
	    .setRequired(false)),
    async execute(interaction) {
        const tag = await interaction.options.getMentionable('tag');
        if(interaction.channel.id === '896039338834542603' || interaction.channel.id === '896039355355914280') {
            if(tag) {
                con.query(`SELECT * FROM ucp WHERE discordid = '${tag.id}'`, async (err, row) => {
                    if(row.length < 1) {
                        await interaction.reply({content: `\`\`\`\nThe ucp is not registered yet\`\`\``, ephemeral: true});
                        return;
                    }
                    else {
                        const ucp = row[0].name;
                        if(row[0].character_1 == ucp) {
                            var character_1 = "None";
                        }
                        else {
                            var character_1 =  row[0].character_1;
                        }
                        if(row[0].character_2 == ucp) {
                            var character_2 = "None";
                        }
                        else {
                            var character_2 =  row[0].character_2;
                        }
                        if(row[0].character_3 == ucp) {
                            var character_3 = "None";
                        }
                        else {
                            var character_3 =  row[0].character_3;
                        }
                        await interaction.reply({content: `**List character UCP <@${tag.id}>:\`\`\`\n- ${character_1}\n- ${character_2}\n- ${character_3}\`\`\`**`});
                    }
                })
            }
            else {
                con.query(`SELECT * FROM ucp WHERE discordid = '${interaction.user.id}'`, async (err, row) => {
                    if(row.length < 1) {
                        await interaction.reply({content: `\`\`\`\nThe ucp is not registered yet\`\`\``, ephemeral: true});
                        return;
                    }
                    else {
                        const ucp = row[0].name;
                        if(row[0].character_1 == ucp)
                        {
                            var character_1 = "None";
                        }
                        else
                        {
                            var character_1 =  row[0].character_1;
                        }
                        if(row[0].character_2 == ucp)
                        {
                            var character_2 = "None";
                        }
                        else
                        {
                            var character_2 =  row[0].character_2;
                        }
                        if(row[0].character_3 == ucp)
                        {
                            var character_3 = "None";
                        }
                        else
                        {
                            var character_3 =  row[0].character_3;
                        }
                        await interaction.reply({content: `**List character UCP <@${interaction.user.id}>:\`\`\`\n- ${character_1}\n- ${character_2}\n- ${character_3}\`\`\`**`});
                    }
                })
            }
        }
		else {
			await interaction.reply({content: `\`\`\`\nYou can't use this command on this channel\`\`\``, ephemeral: true});
		}
    }
}