const Discord = require('discord.js');
const client = new Discord.Client();
const {token} = require('./configs.json');
var Stats = require('./Stats.js')

client.login(token);
//constantly check messages from users
 client.on('message', (msg) =>{
    if (msg.content == 'what is that'){
      msg.reply('I am a test bot');
}
 });

//runs when bot turns on
client.on('ready', () => {
console.log('Bot is now connected '+ Stats.STR);
});
