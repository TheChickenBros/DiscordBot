// jshint ignore: start

const main = require('./../index.js');
let connection;
module.exports = {
	name: 'join',
	description: 'Join voice channel',
	async execute(msg, args) {
        if (msg.member.voice.channel) {
            connection = await msg.member.voice.channel.join();
            reply = ":thumbsup: Joined " + msg.member.voice.channel.name;
            msg.channel.send(reply);
        } else {
            reply = "You need to join a voice channel first!";
            msg.channel.send(reply);
        }
	},
};