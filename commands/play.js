// jshint ignore: start
const connection = require('./join.js').connection;
const ytdl = require('ytdl-core');

module.exports = {
	name: 'play',
	description: 'Play youtube video through voice channel but it doesnt work currently',
	async execute(msg, args) {
        if (connection === null) {
            msg.channel.send("Join a voicechannel or do -join to do this command.");
            return;
        } else {
            console.log("Splitting " + command);
            var link = command.split(" ");
            console.log(link);
            console.log("Getting song info");
            const songInfo = await ytdl.getInfo(link[1]);
            console.log("Done");
            const song = {
                title: songInfo.videoDetails.title,
                url: songInfo.videoDetails.video_url
            };

            msg.channel.send("Downloading audio for " + song.title);
            ytdl(song.url, { quality: 'highestaudio', filter: 'audioonly' }).pipe(fs.createWriteStream('audio.mp3'));
            console.log("Downloaded");
            msg.channel.send("Downloaded audio");

            console.log("Playing");
            msg.channel.send("Playing");

            const broadcast = client.voice.createBroadcast();
            const dispatcher = broadcast.play(fs.createReadStream('audio.mp3'));
            connection.play(dispatcher);

            console.log("Done");
            msg.channel.send("Done");
        }
	},
};