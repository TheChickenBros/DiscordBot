const main = require('./../index.js');

module.exports = {
	name: 'boop',
	description: 'boop',
	execute(msg, args) {
        reply = "boop";
		main.sendEmbed('boop', reply, msg.channel, 'https://i.kym-cdn.com/photos/images/original/001/095/236/130.jpg');
	},
};