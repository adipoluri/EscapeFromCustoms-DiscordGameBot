const Discord = require('discord.js');
const {token} = require('./configs.json');
const fs = require('fs');
const prefix = "!";
var Stats = require('./Stats.js')
const client = new Discord.Client();
client.login(token);


client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));


for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}

//constantly check messages from users
client.on('message', message =>{
  if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();
  var USERID = message.member.id;
  processID(USERID);
  if (!client.commands.has(command)) return;

  try {
	  client.commands.get(command).execute(message, args);
  } catch (error) {
	  console.error(error);
	  message.reply('there was an error trying to execute that command!');
  }
});

//runs when bot turns on
client.on('ready', () => {
console.log('Bot is now connected ');
});

function processID(callback){
exports.USERID = callback;
}