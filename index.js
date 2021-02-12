const Discord = require('discord.js');
const client = new Discord.Client();

const config = require('./config.json')
const command = require('./command')
const roleClaim = require('./role-cliam')

client.once('ready', () => {
	console.log('Ready!');
	client.user.setActivity("being idot!", { type: 'COMPETING'})


	roleClaim(client)

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
		var modperms  = (message.member.hasPermission('ADMINISTRATOR') || message.member.hasPermission('KICK_MEMBERS') || message.member.hasPermission('BAN_MEMBERS') || message.member.hasPermission('MANAGE_CHANNELS') || message.member.hasPermission('MANAGE_GUILD') || message.member.hasPermission('VIEW_AUDIT_LOG') || message.member.hasPermission('MANAGE_MESSAGES') || message.member.hasPermission('MENTION_EVERYONE') || message.member.hasPermission('VIEW_GUILD_INSIGHTS') || message.member.hasPermission('MUTE_MEMBERS') || message.member.hasPermission('DEAFEN_MEMBERS') || message.member.hasPermission('MOVE_MEMBERS') || message.member.hasPermission('MANAGE_NICKNAMES') || message.member.hasPermission('MANAGE_ROLES') || message.member.hasPermission('MANAGE_WEBHOOKS') || message.member.hasPermission('MANAGE_EMOJIS'))
		
		if(modperms) {
			let membed = new Discord.MessageEmbed()
			.setColor('RANDOM')
			.addField('Moderation Commands(1)', "`purgeall`")
			.setFooter('Want more help? use the "a!help" command!')
			.setTimestamp();
			message.channel.send(membed)
		}
		if (!modperms) return;
		
		
	})

	command(client, 'ban', message => {
		const { member, mentions } = message 

		if (member.hasPermission('ADMINISTRATOR') || member.hasPermission('BAN_MEMBERS')) {
			console.log('WORKS....')
		} else {
			message.channel.send(`<@${member.id}> You do not have permissions to use this command!`)
		}
	})
});





client.login(process.env.token)