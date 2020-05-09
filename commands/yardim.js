const { prefix } = require('../config.json')
const roller = require('../rol.json')

module.exports = {
	name: 'yardım',
	description: 'Tüm komutlarım veya belirli bir komutla ilgili bilgileri listele.',
	aliases: ['commands'],
	usage: '[komut]',
	cooldown: 5,
  access: [
		roller.admin.id,
		roller.mod.id
  ],
	execute(message, args) {
    console.log(`> ${member.tag} called yardim.js "${message.content}"`);

		const data = []
		const { commands } = message.client

		if (!args.length) {
			data.push('İşte tüm komutlarımın listesi:')
			data.push(commands.map(command => command.name).join(', '))
			data.push(`Belirli bir komut hakkında bilgi almak için \`${prefix}yardım [komut] \` gönderebilirsiniz!`)

			return message.author.send(data, { split: true })
				.then(() => {
					if (message.channel.type === 'dm') return
					message.reply('Sana tüm komutlarımla birlikte bir DM gönderdim!')
				})
				.catch(error => {
					console.error(`${Message.author.tag} yardım DM gönderilemedi.\n`, error)
					message.reply('sana DM gönderemiyorum gibi görünüyor!')
				})
		}

		const name = args[0].toLowerCase()
		const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name))

		if (!command) {
			return message.reply('bu geçerli bir komut değil')
		}

		data.push(`**Komut:** ${command.name}`)

		if (command.aliases) data.push(`**Takma İsimler:** ${command.aliases.join(', ')}`)
		if (command.description) data.push(`**Açıklama:** ${command.description}`)
		if (command.usage) data.push(`**Kullanım:** ${prefix}${command.name} ${command.usage}`)

		data.push(`**Cooldown:** ${command.cooldown || 3} second(s)`)

		message.channel.send(data, { split: true })
	},
}