const Discord = require('discord.js');
const client = new Discord.Client();

const config = require('./config.json')
const command = require('./command')
const privateMessage = require('./private-message')


client.once('ready', () => {
	console.log('Ready!');
	client.user.setActivity("being idot!", { type: 'COMPETING'})


	privateMessage(client, 'ping', 'Pong!')


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
			message.channel.fetch().then(messages => {
				message.channel.bulkDelete(messages)
				
			})
		}
	})
});





client.login(process.env.token)