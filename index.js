const Discord = require('discord.js');
const client = new Discord.Client();

const config = require('./config.json')
const command = require('./command')

client.once('ready', () => {
	console.log('Ready!');

	command(client, 'ping', message => {
		message.channel.send(`Pong!`)
	})
});




client.login(process.env.token)