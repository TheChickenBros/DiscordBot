const main = require('./../index.js');
const Levels = require('discord-xp');
const canva = require('canvacord');

module.exports = {
    name: 'rank',
	description: 'rank',
	async execute(msg, args) {
        const target = msg.mentions.users.first() || msg.author; // Grab the target.
 
        const user = await Levels.fetch(target.id, msg.guild.id); // Selects the target from the database.
 
        if (!user) {return msg.channel.send("Seems like this user has not earned any xp so far.");} // If there isnt such user in the database, we send a message in general.

        //let image = await canva.rank({ username: target.username, discrim: "0001", level: user.level, rank: 1, neededXP: 500, currentXP: user.xp, avatarURL: target.displayAvatarURL(), color: "#FFFFFF" });
        //const attachment = new Discord.MessageAttachment(image, "rank.png");
        //msg.channel.send(attachment);
        msg.send(`${target.username}'s rank is: ${user.level}. XP Needed to levelup: (WIP)`);
	},
};