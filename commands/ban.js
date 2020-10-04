const main = require('./../index.js');
const fs = require('fs');

module.exports = {
	name: 'ban',
    description: 'ban a user',
	async execute(msg, args) {
        if (msg.author.id !== '680210884110712873') {return;}
        try {
            const member = msg.mentions.members.first();
            msg.guild.ban(member);
            msg.channel.send(`Banned ${member.username}`);
            console.log("Banned user: " + member.username + ", with id: " + member.id);
            fs.appendFile('./files/banned-users.csv', `\n${member.username},${member.id},${msg.author.username},${msg.author.id}`, (err) => {
                if (err) {throw err;}
                console.log('Done writing id');
            });
        } catch (error) {
            console.log(error);
            console.log('Error while banning ' + member.username);
            msg.channel.send(`Error while banning ${member.username}`);
        }
	},
};