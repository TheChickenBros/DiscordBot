const main = require('./../index.js');
const Discord = require('discord.js');
const canva = require('canvacord');

module.exports = {
	name: 'triggered',
	description: 'triggered',
	async execute(msg, args) {
        const user = msg.mentions.users.first() || msg.author;
        const avatar = user.displayAvatarURL({ dynamic: false, format: 'png' });
        const image = await canva.trigger(avatar);
        const attachment = new Discord.MessageAttachment(image, "triggered.gif");

		msg.channel.send(attachment);
	},
};