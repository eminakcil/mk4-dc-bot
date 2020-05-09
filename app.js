const fs = require('fs')
const Discord = require('discord.js')
const { prefix, token } = require('./config.json')

const client = new Discord.Client()
client.commands = new Discord.Collection()

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'))

for (const file of commandFiles) {
  const command = require(`./commands/${file}`)
  client.commands.set(command.name, command)
}

client.on('ready', () => {
  console.log('Hazırım!')
})

client.on('message', message => {
  if (!message.content.startsWith(prefix) || message.author.bot) return
  const args = message.content.slice(prefix.length).split(/ +/)
  const commandName = args.shift().toLowerCase()

  if (!client.commands.has(commandName)) return



  const command = client.commands.get(commandName)
  if (command.args && !args.length) {
    let reply = `You didn't provide any arguments, ${message.author}!`
    if (command.usage) {
      reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``
    }
    return message.channel.send(reply)
  }

  if (command.guildOnly && message.channel.type !== 'text') {
    return message.reply('Sadece sunucuda çalışan komut.')
  }

  try {
    command.execute(message, args)
  } catch (error) {
    console.error(error)
    message.reply('there was an error trying to execute that command!')
  }

})

client.on('guildMemberAdd', (member) => {
  //rol atayabilrisin ve hoşgeldin mesajı bla bla bla
  const misafirRol = member.guild.roles.cache.get(roller.misafir.id)
  member.roles.add(misafirRol)
})

client.login(token)