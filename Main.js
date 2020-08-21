const Discord = require('discord.js');
const client = new Discord.Client();
const {token} = require('./config.json');
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

