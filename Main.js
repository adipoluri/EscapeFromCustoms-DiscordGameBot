const Discord = require('discord.js');
const token = 'NzQ2Mjk4NTM4MzMzMzA2OTUx.Xz-SrQ.07Ht-A5wqb2VxjS9pfx1iteLfgM'
const client = new Discord.Client();
client.login(token);

//constantly check messages from users
 client.on('message', (msg) =>{
    if (msg.content == 'what is that'){
      msg.reply('I am a test bot');
}
 });

//runs when bot turns on
client.on('ready', () => {
console.log('Bot is now connected');

const channel = client.channels.cache.get('125358791146340352').send('Connected!');
});

