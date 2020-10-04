const main = require('./../index.js');

module.exports = {
	name: 'announce',
	description: 'Announce important things',
	execute(msg, args) {
		reply = ":rotating_light: @everyone look here";
		for (i = 0; i < args; i++) {
			msg.channel.send(reply);
		}
		msg.channel.send("wow im gonna get in trouble");
	},
};