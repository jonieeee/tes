const {guildId, channelIdLeave} = require('../config.json');

module.exports = {
    name: 'guildMemberRemove',
    description: 'Untuk mendeteksi jika ada member yang keluar dari server',
	execute(member) {
	    if(member.guild.id === guildId){
            const channelLeave = member.guild.channels.cache.get(channelIdLeave);
            const messageLeave= `**<@${member.id}>\`\`\`\n🎉 Selamat Tinggal ${member.user.tag} 🎉\n🎉 Jangan Lupa Kembali 🎉\n🎉 Terima Kasih Sudah Berkunjung 🎉\`\`\`**`;
            channelLeave.send(messageLeave);
            console.log(`${member.user.username} Telah masuk ke server`);
        };
	},
};