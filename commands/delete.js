const main = require('./../index.js');
const canva = require('canvacord');
const Discord = require('discord.js');

module.exports = {
	name: 'delete',
	description: 'delete',
	async execute(msg, args) {
        const user = msg.mentions.users.first() || msg.author;
        const avatar = user.displayAvatarURL({ dynamic: false, format: 'png' });
        const image = await canva.delete(avatar);
        const attachment = new Discord.MessageAttachment(image, "deleted.png");

        msg.channel.send(attachment);
	},
};