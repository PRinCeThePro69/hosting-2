const Discord = require('discord.js');
const client = new Discord.Client();

const config = require('./config.json')
const command = require('./command')


client.once('ready', () => {
	console.log('Ready!');
	client.user.setActivity("being idot!", { type: 'COMPETING'})




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
	command (client, 'help', message => {
		let embed = new Discord.MessageEmbed()
		.setTitle('Help Menu')
		.setDescription('My prefix is `a!`. The are the command list of me. **Make sure to use the prefix before each command!**')
		.setColor('RANDOM')
		.addField('Miscellenious Commands(1)', "`help`")
		.addField('Information Commands (1)', "`a!server`")
		.setFooter('If you are a moderator in this server, then please use the "a!mod-cmds" command.')
		.setTimestamp();
		message.channel.send(embed);

	// if (message.member.hasPermission('ADMINISTRATOR') || message.member.hasPermission('MANAGE_MESSAGES')) {
		//let membed = new Discord.MessageEmbed()
		//.addField('Moderation Commands(1)', "`purgeall`");
		//message.channel.send(membed, embed)
	// }
	}) 
	command(client, 'mod-cmds', message => {
		var modperms  = (message.author.hasPermission('ADMINISTRATOR') || message.author.hasPermission('KICK_MEMBERS') || message.author.hasPermission('BAN_MEMBERS') || message.author.hasPermission('MANAGE_CHANNELS') || message.author.hasPermission('MANAGE_GUILD') || message.author.hasPermission('VIEW_AUDIT_LOG') || message.author.hasPermission('MANAGE_MESSAGES') || message.author.hasPermission('MENTION_EVERYONE') || message.author.hasPermission('VIEW_GUILD_INSIGHTS') || message.author.hasPermission('MUTE_MEMBERS') || message.author.hasPermission('DEAFEN_MEMBERS') || message.author.hasPermission('MOVE_MEMBERS') || message.author.hasPermission('MANAGE_NICKNAMES') || message.author.hasPermission('MANAGE_ROLES') || message.author.hasPermission('MANAGE_WEBHOOKS') || message.author.hasPermission('MANAGE_EMOJIS'))
		
		if(modperms) {
			let membed = new Discord.MessageEmbed()
			.setColor('RANDOM')
			.addField('Moderation Commands(1)', "`purgeall`")
			.setFooter('Want more help? user the "a!help" command!')
		}
		
		
	})
});





client.login(process.env.token)