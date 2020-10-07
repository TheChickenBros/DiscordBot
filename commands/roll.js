const main = require('./../index.js');

module.exports = {
    name: 'roll',
	description: 'Roll a random player',
	async execute(msg, args) {
        let user = msg.guild.members.cache.random();

        while (user.bot) {
            user = msg.guild.members.cache.random();
        }
        
        msg.channel.send(`I rolled ${user}!`);
    }
};