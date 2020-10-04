const main = require('./../index.js');

module.exports = {
	name: 'ping',
    description: 'ping pong',
	execute(msg, args) {
        reply = "ping pong bing bong ching chong CHINA";
		main.sendEmbed('Ping!', reply, msg.channel, null);
	},
};