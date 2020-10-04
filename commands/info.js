const main = require('./../index.js');

module.exports = {
	name: 'info',
	description: 'Bot info',
	execute(msg, args) {
        reply = "This is the Beeg Chicken Bot. \nCommands:\n-ping\n-boop\n-join\n-disconnect\n-play (not working)\n-ree\n-announce\n-changemymind\n-delete\n-trigger\n-gay (not working)";
		main.sendEmbed(main.client.user.username, reply, msg.channel, null);
	},
};