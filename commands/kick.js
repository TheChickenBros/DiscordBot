const main = require('./../index.js');
const fs = require('fs');

module.exports = {
	name: 'kick',
    description: 'kick a user',
	async execute(msg, args) {
        if (msg.author.id !== '680210884110712873') {return;}
        try {
            const member = msg.mentions.members.first();
            member.kick();
            msg.channel.send(`Kicked ${member.username}`);
            console.log("Kicked user: " + member.username + ", with id: " + member.id);
            fs.appendFile('./files/kicked-users.csv', `\n${member.username},${member.id},${msg.author.username},${msg.author.id}`, (err) => {
                if (err) {throw err;}
                console.log('Done writing id');
            });
        } catch (error) {
            console.log(error);
            console.log('Error while kicking ' + member.username);
            msg.channel.send(`Error while kicking ${member.username}`);
        }
	},
};