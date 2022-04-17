const { SlashCommandBuilder } = require('@discordjs/builders');
const { timingSafeEqual } = require('crypto');
const con = require('../function/mysql');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('editucpname')
    .setDescription('For edit UCP name the player')
    .addMentionableOption(option => option.setName('tag')
	    .setDescription('Tag anyone for edit UCP')
	    .setRequired(true))
    .addStringOption(option => option.setName('name')
        .setDescription('Set name for edit name the UCP')
        .setRequired(true)),
    async execute(interaction) {
        const tag = await interaction.options.getMentionable('tag');
        const name = await interaction.options.getString('name');
        if(interaction.channel.id === '916679131058565171' || interaction.channel.id === '896039338834542603' || interaction.channel.id === '896039355355914280') {
            if(!interaction.member.permissions.has('ADMINISTRATOR')) return await interaction.reply({content: `\`\`\`\nYou are not admin, you can't use this command\`\`\``, ephemeral: true}); 
            if(tag){
                con.query(`SELECT * FROM ucp WHERE discordid = '${tag.id}'`, async (err, row) => {
                    if(row.length < 1) {
                        await interaction.reply(`<@${tag.id}>, Anda belum register, silahkan register terlebih dahulu di channel <#916643356392710175>`);
                        return;
                    }
                    else {
                        var character1 = row[0].character_1;
                        var character2 = row[0].character_2;
                        var character3 = row[0].character_3;
                        var nama = row[0].name;
                        if(name){
                            con.query(`SELECT * FROM ucp WHERE name = '${name}'`, async (err, row) => {
                                if(row.length < 1) {
                                    if(interaction.member.permissions.has('ADMINISTRATOR')){
                                        if(character1 === nama){
                                            con.query(`UPDATE ucp SET character_1 = '${name}' WHERE discordid = '${tag.id}'`);
                                        }
                                        if(character2 === nama){
                                            con.query(`UPDATE ucp SET character_2 = '${name}' WHERE discordid = '${tag.id}'`);
                                        }
                                        if(character3 === nama){
                                            con.query(`UPDATE ucp SET character_3 = '${name}' WHERE discordid = '${tag.id}'`);
                                        }
                                        con.query(`UPDATE users SET ucp = '${name}' WHERE ucp = '${nama}'`);
                                        interaction.reply(`Berhasil mengganti nama UCP dari <@${tag.id}> menjadi ${name}`);
                                        con.query(`UPDATE ucp SET name = '${name}' WHERE discordid = '${tag.id}'`);
                                    }
                                    else{
                                        interaction.reply(`Berhasil mengganti nama UCP dari <@${tag.id}> menjadi ${name}`);
                                    }
                                    return;
                                }
                                else {
                                    interaction.reply(`<@${tag.id}>, Nama ${name} tersebut sudah dipakai, silahkan req ulang dan pilih nama yang lain.`);
                                }
                            })
                        }
                    }
                })
            }
        }
    }
}