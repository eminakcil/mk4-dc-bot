const fs = require('fs')
const Discord = require('discord.js')
const { prefix, token } = require('./config.json')
const roller = require('./rol.json')

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
    let reply = `Hiç argüman girmedin, ${message.author}!`
    if (command.usage) {
      reply += `\nUygun kullanım: \`${prefix}${command.name} ${command.usage}\``
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
    message.reply('komut çalıştırılırken hata oluştu!')
  }

})

client.on('guildMemberAdd', (member) => {
  //rol atayabilrisin ve hoşgeldin mesajı bla bla bla
  member.roles.add(roller.misafir.id)
})

client.login(token)