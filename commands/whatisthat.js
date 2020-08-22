module.exports = {
	name: 'register',
	description: 'registers player into database',
	execute(message, args) {
		message.channel.send('Registered!');
	},
};