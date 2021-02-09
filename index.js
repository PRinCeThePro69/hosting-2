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

	command(client, ['purge', 'clear'],  message => {

        const messageArray = message.content.split(' ');
        const args = messageArray.slice(1);

        if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send('You lack the permissions needed for this command!');

        let deleteAmount;

        if (isNaN(args[0]) || parseInt(args[0]) <= 0) { return message.reply('Requires an amount') }

        if (parseInt(args[0]) > 99) {
            return message.reply('You can only delete 99 messages at a time!')
        } else {
            deleteAmount = parseInt(args[0]);
        }

        message.channel.bulkDelete(deleteAmount + 1, true);
         message.channel.send(`*Successfully* Deleted **${deleteAmount}** Messages!`).then(m => m.delete({ timeout: 3000 }))

    })
});




client.login(process.env.token)