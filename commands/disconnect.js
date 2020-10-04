const main = require('./../index.js');

module.exports = {
	name: 'disconnect',
	description: 'Disconnect from voice channel',
	execute(msg, args) {
        msg.channel.send("Left voice channel " + msg.member.voice.channel.name);
        msg.member.voice.channel.leave();
	},
};