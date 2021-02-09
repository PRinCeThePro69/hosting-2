const Discord = require('discord.js');
const client = new Discord.Client();

const config = require('./config.json')
const command = require('./command')

client.once('ready', () => {
	console.log('Ready!');

	command(client, 'ping', (message) => {
		message.channel.send(`Pong!`)
	})

	command(client, 'server', (message) => {
		client.guilds.cache.forEach((guild) => {
			let embed = new Discord.MessageEmbed()
			.setTitle('Server Information')
			.setDescription(
				`These are the current information of **${message.guild.name}**`
			)
			.setColor('RANDOM')
			.addField('Total Members', `${message.guild.memberCount} Members`)
			.addField('Server Region', `${message.guild.region}`)
			.addField('Server ID', `${message.guild.id}`)
			.addField('Creation Time', `${message.guild.createdAt}`)
			.setFooter(
				`Bot made by PRinCe#9934. Command Executed by ${message.author.tag}`
			);
		message.channel.send(embed);
		})
	})

	command(client, ['purgeall', 'pa'], message => {
		if (message.member.hasPermission('ADMINISTRATOR')) {
			message.channel.fetch().then(results => {
				message.channel.bulkDelete(results)
				
			})
		}
	})
});




client.login(process.env.token)