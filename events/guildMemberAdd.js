const {guildId, channelIdJoin} = require('../config.json');

module.exports = {
    name: 'guildMemberAdd',
    description: 'Untuk mendeteksi jika ada member yang masuk di server',
	execute(member) {
	    if(member.guild.id === guildId){
            const channelJoin = member.guild.channels.cache.get(channelIdJoin);
            const messageJoin= `**<@${member.id}>\`\`\`\n🎊 Selamat Datang ${member.user.username} 🎊\n🎊 Jangan Lupa Baca Rules 🎊\n🎊 Semoga Betah Disini Yaa 🎊\`\`\`**`;
            channelJoin.send(messageJoin);
            member.roles.add('896039248355016754');
            console.log(`${member.user.username} Telah masuk ke server`);
        };
	},
};