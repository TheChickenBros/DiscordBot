const main = require('./../index.js');
const canva = require('canvacord');
const fs = require('fs');
const request = require('request');

module.exports = {
	name: 'gay',
	description: 'lol gay',
	async execute(msg, args) {
        const reply = "gay";
        const download = (uri, path, callback) => {
            request.head(uri, (err, res, body) => {
                request(uri).pipe(fs.createWriteStream(path)).on('close', callback);
            });
        };

        const user = msg.mentions.users.first() || msg.author;
        const avatar = user.avatarURL({ format: 'png', dynamic: true, size: 2048 });
        download(avatar, './gay.png', () => {
            console.log('Done downloading avatar');
        });

        //const image = canva.gay(avatar);

        canva.write(canva.gay('./gay.png'), 'gay.png');
        msg.channel.send('', {files: ['./gay.png']});
        //main.sendEmbed(reply, reply, msg.channel, 'gay.png', true);
        
        try {
			fs.unlinkSync('./gay.png');
		} catch(err) {
			console.error(err);
		}
	},
};