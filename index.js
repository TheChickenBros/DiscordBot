//Dependencies
const Discord = require('discord.js');
const Levels = require("discord-xp");
const fs = require('fs');
const { prefix, token, welcomeChannel } = require('./config.json');

//Discord client constructor
const client = new Discord.Client();

//Setup Discord-XP
Levels.setURL("mongodb://127.0.0.1:27017/");

//Constants and variables
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
const defaultEmbed = new Discord.MessageEmbed().setColor('#1d375c');
let reply = null;
let guildSize = client.guilds.cache.size;
let guildJoinQuestions = ["Didja bring pizza, <@", "You got any cookies, <@", "Are you an alligator, <@"];
let guildJoinMessages = ["Our lord and savior, <@", " is here!"];

//Exports
module.exports = { sendServerMessage, guildSize, client, randomBetween, sendEmbed};

//Run server
const server = require('./server.js');

//Loop through command files
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);

	// set a new item in the Collection
	// with the key as the command name and the value as the exported module
	client.commands.set(command.name, command);
}

//Send message from server
function sendServerMessage(msg, channel) {
    client.channels.cache.get(channel).send(msg);
}

//Get a random number between min and max
function randomBetween(min, max) {
    return Math.round(Math.random() * (max - min + 1) + min);
}

//Function for easy embeds
function sendEmbed(title, message, channel, img, isAttachment) {
    if (img === null) {return;}

    if (isAttachment) {
        defaultEmbed.setImage('attachment://' + img);
        defaultEmbed.attachFiles(img);
    } else {
        defaultEmbed.setImage(img);
    }

    defaultEmbed.setTitle(title);
    defaultEmbed.setDescription(message);
    channel.send(defaultEmbed);
}

//Add random xp when a user sends a message
async function addRandomXP(msg) {
    const randomXP = randomBetween(1, 30); // Min 1, Max 30
    const hasLeveledUp = await Levels.appendXp(msg.author.id, msg.guild.id, randomXP);
    console.log(randomXP);
    if (hasLeveledUp) {
        const user = await Levels.fetch(message.author.id, message.guild.id);
        msg.channel.send(`${msg.author}, congratulations! You have leveled up to **${user.level}**. :tada:`);
    }
}

process.on('unhandledRejection', error => console.error('Uncaught Promise Rejection', error));

//On client ready
client.on('ready', () => {
    console.log("I'm in");
    console.log(client.user.username);
    client.guilds.cache.each((guild) => { let channels = guild.channels.cache.filter(c => c.type === 'text').map(c => c.name + " " + c.id); console.log(guild.name); console.log(channels); });
    if (client.guilds.cache.size < 2) {
        client.user.setActivity(`${client.guilds.cache.size} server`, { type: 'WATCHING' });
    } else {
        client.user.setActivity(`${client.guilds.cache.size} servers`, { type: 'WATCHING' });
    }
    
});

//On message send
client.on('message', async msg => {
    if (msg.channel.type === "dm" || msg.guild === null) {
        if (msg.content.startsWith(prefix)) {
            msg.author.send('Please join a guild to use that command.');
        } else {
            msg.author.send('Join a guild first.');
        }
        return;
    } else {
        console.log(`#${msg.channel.name} ${msg.author.username}: ${msg.content}`);
        addRandomXP(msg);
    }
    if (msg.author.id === client.user.id) {return;}
    if (!msg.content.startsWith(prefix) || msg.author.bot) {return;}

    const args = msg.content.slice(prefix.length).trim().split(' ');
    const command = args.shift();
        
    if (!client.commands.has(command)) {return;}

    try {
        msg.channel.startTyping();
        client.commands.get(command).execute(msg, args);
        msg.channel.stopTyping();
    } catch (error) {
        console.error(error);
        msg.channel.send('Shit somet̸͓̥̒̊̆̔h̸̭̻͇͚̬̍͒̓i̶̛̗͙̼̣̠̼̥̰̠̖̘͕̙̮̓̈̌̈́̄̎n̴̨̨̪̲̞̬̮̣̪͑̿̒̌̍́̅͐̀͋͠g̶̢̧͈͉̖̬͙̫̓ ̶̡̝̥̮͚̟̗͙̘̏̿͂͊̊̂̅̓b̶̧̫͔͉̖̞͔̼̪̩̹̟̳͠ͅr̸̨̪̻̩̞̻̦̜̣̪̻̂͑͑͆̌̀ò̸̢̜̫̯̲͙̻̮̦͋̾̓̾͒̉̈͝ͅk̸̢̢̡̢̨̛̻͎̼̘̩̲̝̰̥̲͇͕͖̣̘̤̹̠̞̩̞̙̤͚̰̳̻̘̣̹̤͖̱̼̲̱̥͖̖̤͌̽͊̓͛͑͋̆̓̌̈́̍̍̈̊̓̈́͆̐̔̒̆͗̒̾́̋͂̊̋̈́́̿̑̎͊̍̾̏̓̚͘̕͠͠͠ͅḙ̴̡̡̧̛͙̦͍̪͈̖̪͔͔̟̝̫̹̗͎̗̹̱͌̈̑̏͊̍̃̈́̀͋͋̊͑̓͆͂̉̓̾͒ͅ');
    }
});

//On guild member add
client.on('guildMemberAdd', member => {
    // Send the message to a designated channel on a server:
    const channel = member.guild.channels.cache.find(ch => ch.name === welcomeChannel);
    // Send message to console when channel wasn't found
    if (!channel) {consloe.log(`Channel ${welcomeChannel} wasn't found in server.`); return;}
    // Send the message, mentioning the member
    let pickType = randomBetween(0, 1);
    if (pickType === 0) {
        let Message = guildJoinQuestions[randomBetween(0, 2)];
        channel.send(`${Message}${member.id}>?`);
    } else {
        channel.send(guildJoinMessages[0] + member.id + ">" + guildJoinMessages[1]);
    }
});

//On joining a server
client.on('guildCreate', guild => {
    console.log(`Joined ${guild.name}`);
    if (client.guilds.cache.size < 2) {
        client.user.setActivity(`${client.guilds.cache.size} server`, { type: 'WATCHING' });
    } else {
        client.user.setActivity(`${client.guilds.cache.size} servers`, { type: 'WATCHING' });
    }

});

client.login(token);