module.exports = {
	name: 'help',
	description: 'helps',
	execute(message) {
        const Discord = require('discord.js');
        const Embed = new Discord.MessageEmbed()
        .setColor('#0099ff')
        .setTitle("Hello survivor, my name is Fence.")
        .setThumbnail("https://static.wikia.nocookie.net/escapefromtarkov_gamepedia/images/0/0f/FenceFullRes.png/revision/latest/scale-to-width-down/800?cb=20190224001435")
        .setDescription("I will be your guide and sole advisor for your adventures through customs. I have attached all the commands you are able to execute.")
        .addFields(
            { name: '!register', value: "Do this command to enter yourself into our database" },
            { name: '!profile', value: "Lets you view your personal profile"},
            { name: "!setdesc", value:"Lets you set your own description for your profile" },
            { name: "!raid", value: "This lets you start an actual raid in customs! Must be registered to start." },
        )
        //.setImage(message.member.user.avatarURL)
        //.addField('Inline field title', 'Some value here', true)		
        //.setTimestamp()
        //.setFooter('Some footer text here', 'https://i.imgur.com/wSTFkRM.png');
        //.setThumbnail('https://i.imgur.com/wSTFkRM.png')
        //.setURL('https://discord.js.org/')
        //.setAuthor("Fence", "https://static.wikia.nocookie.net/escapefromtarkov_gamepedia/images/0/0f/FenceFullRes.png/revision/latest/scale-to-width-down/800?cb=20190224001435")

        message.channel.send(Embed);

	},
};