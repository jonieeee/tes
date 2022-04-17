module.exports = {
    name: 'ready',
    description: 'Untuk mendeteksi jika bot nya online',
	async execute(client) {
	    console.log(`Bot ${client.user.tag} telah online`);
		client.user.setActivity('Use "/register [NameUCP]" For register your UCP | Unity Life Roleplay', {type: 'WATCHING'});
	},
};