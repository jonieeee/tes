const { SlashCommandBuilder } = require('@discordjs/builders');
const con = require('../function/mysql');
const { MessageActionRow, MessageSelectMenu, MessageButton } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('deletecharacter')
    .setDescription('For delete character the player')
    .addMentionableOption(option => option.setName('tag')
	    .setDescription('Tag anyone for to the delete character')
	    .setRequired(true)),
    async execute(interaction) {
        const tag = await interaction.options.getMentionable('tag');
        if(interaction.channel.id === '896039338834542603' || interaction.channel.id === '896039355355914280') {
            if(!interaction.member.permissions.has('ADMINISTRATOR')) return await interaction.reply({content: `\`\`\`\nYou are not admin, you can't use this command\`\`\``, ephemeral: true}); 
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

                    const character1 = 'Character 1';
                    const character2 = 'Character 2';
                    const character3 = 'Character 3';

                    const list = new MessageActionRow()
                        .addComponents(
                            new MessageSelectMenu()
                                .setCustomId('char')
                                .setPlaceholder('Select char to the delete')
                                .addOptions([
                                    {
                                        label: character_1,
                                        description: 'Character 1',
                                        value: character1,
                                    },
                                    {
                                        label: character_2,
                                        description: 'Character 2',
                                        value: character2,
                                    },
                                    {
                                        label: character_3,
                                        description: 'Character 3',
                                        value: character3,
                                    },
                                ]),
                        );

                        const filter = (interaction) => interaction.isSelectMenu() || interaction.isButton() && interaction.user.id === interaction.user.id;
                        const collector = interaction.channel.createMessageComponentCollector({ filter, time: 15000 });

                        collector.on('collect', async collected => {
                            if(collected.isSelectMenu()) {
                                if(collected.values[0] === character1) {
                                    if(row[0].character_1 === ucp) {
                                        await collected.update({ content: `**\`\`\`\nThis is not a character\`\`\`**`, components: [], ephemeral: true });
                                    }
                                    else {
                                        const row = new MessageActionRow()
                                            .addComponents(
                                                new MessageButton()
                                                    .setCustomId('sure1')
                                                    .setLabel('Sure')
                                                    .setStyle('SUCCESS'),
                                                new MessageButton()
                                                    .setCustomId('cancel1')
                                                    .setLabel('Cancel1')
                                                    .setStyle('DANGER'),
                                            );

                                        await collected.update({ content: `**\`\`\`\nAre you sure deleted char ${character_1}?\`\`\`**`, components: [row], ephemeral: true });
                                    }
                                }
                                if(collected.values[0] === character2) {
                                    if(row[0].character_2 === ucp) {
                                        await collected.update({ content: `**\`\`\`\nThis is not a character\`\`\`**`, components: [], ephemeral: true });
                                    }
                                    else {
                                        const row = new MessageActionRow()
                                            .addComponents(
                                                new MessageButton()
                                                    .setCustomId('sure2')
                                                    .setLabel('Sure')
                                                    .setStyle('SUCCESS'),
                                                new MessageButton()
                                                    .setCustomId('cancel2')
                                                    .setLabel('Cancel2')
                                                    .setStyle('DANGER'),
                                            );

                                        await collected.update({ content: `**\`\`\`\nAre you sure deleted char ${character_2}?\`\`\`**`, components: [row], ephemeral: true });
                                    }
                                }
                                if(collected.values[0] === character3) {
                                    if(row[0].character_3 === ucp) {
                                        await collected.update({ content: `**\`\`\`\nThis is not a character\`\`\`**`, components: [], ephemeral: true });
                                    }
                                    else {
                                        const row = new MessageActionRow()
                                            .addComponents(
                                                new MessageButton()
                                                    .setCustomId('sure3')
                                                    .setLabel('Sure')
                                                    .setStyle('SUCCESS'),
                                                new MessageButton()
                                                    .setCustomId('cancel3')
                                                    .setLabel('Cancel3')
                                                    .setStyle('DANGER'),
                                            );

                                        await collected.update({ content: `**\`\`\`\nAre you sure deleted char ${character_3}?\`\`\`**`, components: [row], ephemeral: true });
                                    }
                                }
                            }
                            if(collected.isButton()) {
                                if (collected.customId === 'sure1') {
                                    await collected.update({ content: `**\`\`\`\nYou have succesfully deleted char ${character_1}\`\`\`**`, components: [] });
                                    await collected.followUp({ content: `**<@${interaction.user.id}>\`\`\`\n${interaction.user.tag} have succesfully deleted char ${character_1}\`\`\`**`, components: [] });
                                    con.query(`DELETE FROM users WHERE username = '${character_1}'`);
                                    con.query(`UPDATE ucp SET character_1 = '${ucp}' WHERE name = '${ucp}'`);
                                }
                                if (collected.customId === 'cancel1') {
                                    await collected.update({ content: `**\`\`\`\nYou have succesfully cancel to deleted char ${character_1}\`\`\`**`, ephemeral: true, components: [] });
                                }

                                if (collected.customId === 'sure2') {
                                    await collected.update({ content: `**\`\`\`\nYou have succesfully deleted char ${character_2}\`\`\`**`, components: [] });
                                    await collected.followUp({ content: `**<@${interaction.user.id}>\`\`\`\n${interaction.user.tag} have succesfully deleted char ${character_2}\`\`\`**`, components: [] });
                                    con.query(`DELETE FROM users WHERE username = '${character_2}'`);
                                    con.query(`UPDATE ucp SET character_2 = '${ucp}' WHERE name = '${ucp}'`);
                                }
                                if (collected.customId === 'cancel2') {
                                    await collected.update({ content: `**\`\`\`\nYou have succesfully cancel to deleted char ${character_2}\`\`\`**`, ephemeral: true, components: [] });
                                }

                                if (collected.customId === 'sure3') {
                                    await collected.update({ content: `**\`\`\`\nYou have succesfully deleted char ${character_3}\`\`\`**`, components: [] });
                                    await collected.followUp({ content: `**<@${interaction.user.id}>\`\`\`\n${interaction.user.tag} have succesfully deleted char ${character_3}\`\`\`**`, components: [] });
                                    con.query(`DELETE FROM users WHERE username = '${character_3}'`);
                                    con.query(`UPDATE ucp SET character_3 = '${ucp}' WHERE name = '${ucp}'`);
                                }
                                if (collected.customId === 'cancel3') {
                                    await collected.update({ content: `**\`\`\`\nYou have succesfully cancel to deleted char ${character_3}\`\`\`**`, ephemeral: true, components: [] });
                                }
                            }
                        });

                        await interaction.reply({ content: `**Choose a character to delete from <@${tag.id}>**`, components: [list], ephemeral: true });
                }
            })
        }
		else {
			await interaction.reply({content: `\`\`\`\nYou can't use this command on this channel\`\`\``, ephemeral: true});
		}
    }
}