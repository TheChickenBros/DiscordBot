const main = require('./../index.js');
const canva = require('canvacord');

module.exports = {
	name: 'changemymind',
	description: 'Change my mind image maker',
	async execute(msg, args) {
        reply = "Change my mind";

        const text = args.join(" ");

        const image = await canva.changemymind(text);

        canva.write(image, 'files/cmm.png');

		main.sendEmbed(reply, reply, msg.channel, 'files/cmm.png', true);

		try {
			fs.unlinkSync('./files/cmm.png');
		} catch(err) {
			console.error(err);
		}
	},
};